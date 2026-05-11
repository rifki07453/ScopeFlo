import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useReviewStore } from '@/store/useReviewStore';
import { MessageBubble } from './MessageBubble';
import { Button } from '../UI/Button';
import { Item } from '@/types/review';
import { Send, CheckCircle, XCircle } from 'lucide-react';

interface DiscussionPanelProps {
  item: Item;
}

export function DiscussionPanel({ item }: DiscussionPanelProps) {
  const [text, setText] = useState('');
  const [note, setNote] = useState('');
  const [showRevisionInput, setShowRevisionInput] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const allMessages = useReviewStore(state => state.messages);
  const currentUser = useReviewStore(state => state.currentUser);
  const sendTextMessage = useReviewStore(state => state.sendTextMessage);
  const submitReviewAction = useReviewStore(state => state.submitReviewAction);

  const messages = useMemo(() => {
    return allMessages
      .filter((m) => m.item_id === item.id)
      .sort((a, b) => a.timestamp - b.timestamp);
  }, [allMessages, item.id]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    sendTextMessage(item.id, text);
    setText('');
  };

  const handleApprove = () => {
    submitReviewAction(item.id, 'approved');
  };

  const handleRequestRevision = () => {
    if (!showRevisionInput) {
      setShowRevisionInput(true);
      return;
    }
    submitReviewAction(item.id, 'revision', note);
    setShowRevisionInput(false);
    setNote('');
  };

  const isReviewer = currentUser.role === 'reviewer';
  const canReview = isReviewer && item.status === 'in_review';

  return (
    <div className="flex flex-col h-full bg-white border-l border-gray-100 shadow-[inset_1px_0_0_0_rgba(0,0,0,0.05)] w-full">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <h3 className="font-semibold text-gray-900">Discussion</h3>
        <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded border border-gray-200">
          Role: {currentUser.role}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col">
        {messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-center text-gray-400 text-sm italic">
            No messages yet.
          </div>
        ) : (
          messages.map(msg => (
            <MessageBubble 
              key={msg.id} 
              message={msg} 
              isCurrentUser={msg.sender_id === currentUser.id} 
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {canReview && (
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex flex-col gap-3">
          <p className="text-sm font-medium text-gray-700">Review Actions</p>
          
          {showRevisionInput ? (
            <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-2">
              <textarea 
                className="w-full text-sm p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:outline-none resize-none"
                placeholder="Why does this need revision?"
                rows={2}
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <div className="flex gap-2">
                <Button 
                  onClick={() => setShowRevisionInput(false)} 
                  variant="outline" 
                  className="flex-1 h-9 text-sm"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleRequestRevision} 
                  className="flex-1 h-9 text-sm bg-yellow-500 hover:bg-yellow-600 text-white"
                >
                  Submit Revision
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button 
                onClick={handleApprove} 
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Approve
              </Button>
              <Button 
                onClick={handleRequestRevision} 
                variant="outline" 
                className="flex-1 border-yellow-500 text-yellow-700 hover:bg-yellow-50"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Revision
              </Button>
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSend} className="p-4 border-t border-gray-100 bg-white flex gap-2">
        <input 
          type="text" 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..." 
          className="flex-1 px-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black/5"
        />
        <Button 
          type="submit" 
          disabled={!text.trim()} 
          className="rounded-full w-10 h-10 p-0 flex items-center justify-center shrink-0"
        >
          <Send className="w-4 h-4 ml-0.5" />
        </Button>
      </form>
    </div>
  );
}
