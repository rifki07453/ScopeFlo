import React from 'react';
import { Message } from '@/types/review';

interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean;
}

export function MessageBubble({ message, isCurrentUser }: MessageBubbleProps) {
  if (message.type === 'system') {
    return (
      <div className="flex flex-col items-center my-6">
        <div className="bg-gray-100/80 text-gray-500 text-xs py-1.5 px-4 rounded-full border border-gray-200 max-w-[90%] text-center whitespace-pre-wrap">
          {message.content}
        </div>
        <span className="text-[10px] text-gray-400 mt-1">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    );
  }

  return (
    <div className={`flex flex-col my-3 w-full ${isCurrentUser ? 'items-end' : 'items-start'}`}>
      <span className="text-xs text-gray-500 mb-1 px-1">
        {isCurrentUser ? 'You' : message.sender_name}
      </span>
      <div 
        className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm ${
          isCurrentUser 
            ? 'bg-black text-white rounded-br-sm' 
            : 'bg-gray-100 text-gray-900 rounded-bl-sm border border-gray-200'
        }`}
      >
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
      </div>
      <span className="text-[10px] text-gray-400 mt-1 px-1">
        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
    </div>
  );
}
