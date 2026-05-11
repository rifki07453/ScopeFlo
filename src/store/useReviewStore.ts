import { create } from 'zustand';
import { Item, Message, Review, ItemStatus, ReviewActionStatus } from '@/types/review';
import { SowData } from '@/types/project';

// Simple ID generator for our mock DB
const generateId = () => Math.random().toString(36).substring(2, 9);

interface ReviewStore {
  items: Item[];
  messages: Message[];
  reviews: Review[];
  
  // Mock current user
  currentUser: { id: string; name: string; role: 'creator' | 'reviewer' };
  setCurrentUserRole: (role: 'creator' | 'reviewer') => void;

  // Actions
  createItem: (content: SowData) => string;
  getItem: (id: string) => Item | undefined;
  getMessages: (itemId: string) => Message[];
  
  sendPreviewForReview: (itemId: string) => void;
  sendTextMessage: (itemId: string, content: string) => void;
  submitReviewAction: (itemId: string, action: ReviewActionStatus, note?: string) => void;
}

// Mock users for testing
const CREATOR = { id: 'u1', name: 'Alice (Creator)', role: 'creator' as const };
const REVIEWER = { id: 'u2', name: 'Bob (Reviewer)', role: 'reviewer' as const };

export const useReviewStore = create<ReviewStore>((set, get) => ({
  items: [],
  messages: [],
  reviews: [],
  
  currentUser: CREATOR,
  
  setCurrentUserRole: (role) => set({
    currentUser: role === 'creator' ? CREATOR : REVIEWER
  }),

  createItem: (content) => {
    const id = generateId();
    const newItem: Item = {
      id,
      content,
      status: 'draft',
      created_by: get().currentUser.id,
      timestamp: Date.now(),
    };
    
    set((state) => ({ items: [...state.items, newItem] }));
    return id;
  },

  getItem: (id) => get().items.find((i) => i.id === id),
  
  getMessages: (itemId) => get().messages.filter((m) => m.item_id === itemId).sort((a, b) => a.timestamp - b.timestamp),

  sendPreviewForReview: (itemId) => {
    const item = get().items.find(i => i.id === itemId);
    if (!item || item.status !== 'draft') return;

    set((state) => ({
      items: state.items.map((i) => 
        i.id === itemId ? { ...i, status: 'in_review' } : i
      ),
      messages: [...state.messages, {
        id: generateId(),
        item_id: itemId,
        sender_id: 'system',
        sender_name: 'System',
        type: 'system',
        content: `Preview sent for review by ${get().currentUser.name}`,
        timestamp: Date.now(),
      }]
    }));
  },

  sendTextMessage: (itemId, content) => {
    if (!content.trim()) return;
    
    set((state) => ({
      messages: [...state.messages, {
        id: generateId(),
        item_id: itemId,
        sender_id: state.currentUser.id,
        sender_name: state.currentUser.name,
        type: 'text',
        content: content.trim(),
        timestamp: Date.now(),
      }]
    }));
  },

  submitReviewAction: (itemId, action, note) => {
    const user = get().currentUser;
    const isApproval = action === 'approved';
    
    // Create the review record
    const newReview: Review = {
      id: generateId(),
      item_id: itemId,
      reviewer_id: user.id,
      reviewer_name: user.name,
      status: action,
      note,
      timestamp: Date.now(),
    };

    // Construct system message
    let systemMsgContent = '';
    if (isApproval) {
      systemMsgContent = `${user.name} APPROVED this version`;
    } else {
      systemMsgContent = `${user.name} marked this as REVISION`;
      if (note) {
        systemMsgContent += `\nComment: ${note}`;
      }
    }

    set((state) => ({
      reviews: [...state.reviews, newReview],
      items: state.items.map((i) => 
        i.id === itemId ? { ...i, status: action } : i
      ),
      messages: [...state.messages, {
        id: generateId(),
        item_id: itemId,
        sender_id: 'system',
        sender_name: 'System',
        type: 'system',
        content: systemMsgContent,
        timestamp: Date.now(),
      }]
    }));
  }
}));
