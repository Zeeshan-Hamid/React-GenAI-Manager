import React from 'react';
import { User, Bot } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '../types';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className="mb-6">
      <div className="flex items-start mb-2">
        <div className="bg-indigo-100 p-3 rounded-lg rounded-tl-none flex items-start space-x-2 max-w-[85%]">
          <User size={20} className="text-indigo-600 mt-1 flex-shrink-0" />
          <div>
            <p className="font-medium text-indigo-800 mb-1">You</p>
            <p className="text-gray-800">{message.prompt.replace('You: ', '')}</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-start justify-end">
        <div className="bg-purple-100 p-3 rounded-lg rounded-tr-none flex items-start space-x-2 max-w-[85%]">
          <Bot size={20} className="text-purple-600 mt-1 flex-shrink-0" />
          <div>
            <p className="font-medium text-purple-800 mb-1">Grëg</p>
            <p className="text-gray-800 whitespace-pre-wrap">{message.response}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;