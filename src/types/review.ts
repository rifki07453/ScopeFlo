import { SowData } from './project';

export type ItemStatus = 'draft' | 'in_review' | 'approved' | 'revision';
export type MessageType = 'text' | 'system';
export type ReviewActionStatus = 'approved' | 'revision';

export interface Item {
  id: string;
  content: SowData; // Using the SOW data as the 'content'
  status: ItemStatus;
  created_by: string;
  timestamp: number;
}

export interface Message {
  id: string;
  item_id: string;
  sender_id: string;
  sender_name: string;
  type: MessageType;
  content: string;
  timestamp: number;
}

export interface Review {
  id: string;
  item_id: string;
  reviewer_id: string;
  reviewer_name: string;
  status: ReviewActionStatus;
  note?: string;
  timestamp: number;
}
