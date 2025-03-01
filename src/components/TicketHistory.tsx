import React from 'react';
import { TicketHistory as TicketHistoryType } from '../types';
import { Clock, CheckCircle, Circle } from 'lucide-react';
import { formatDate } from '../utils/taskUtils';

interface TicketHistoryProps {
  ticketHistory: TicketHistoryType[];
  onSelectTicket: (ticketId: string) => void;
  onToggleTicketStatus: (ticketId: string, completed: boolean) => void;
}

const TicketHistory: React.FC<TicketHistoryProps> = ({ 
  ticketHistory, 
  onSelectTicket,
  onToggleTicketStatus
}) => {
  if (ticketHistory.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">
        <p>No ticket history yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {ticketHistory.map((ticket) => (
        <div 
          key={ticket.id}
          className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex justify-between items-start mb-2">
            <button 
              onClick={() => onSelectTicket(ticket.id)}
              className="text-[#0040D1] font-medium hover:underline text-left"
            >
              {ticket.title}
            </button>
            <button
              onClick={() => onToggleTicketStatus(ticket.id, !ticket.completed)}
              className="flex items-center focus:outline-none"
              aria-label={ticket.completed ? "Mark as incomplete" : "Mark as complete"}
            >
              {ticket.completed ? (
                <CheckCircle className="text-[#00C26C] h-5 w-5 flex-shrink-0" />
              ) : (
                <Circle className="text-gray-400 h-5 w-5 flex-shrink-0" />
              )}
            </button>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <Clock size={12} className="mr-1" />
            <span>{formatDate(ticket.timestamp)}</span>
            <span className="mx-2">•</span>
            <span>{ticket.tasks.length} tasks</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TicketHistory;