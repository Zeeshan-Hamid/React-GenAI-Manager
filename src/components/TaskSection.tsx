import React, { useState } from 'react';
import { Task } from '../types';
import TaskList from './TaskList';
import TicketHistory from './TicketHistory';
import { PlusCircle, ClipboardList, History } from 'lucide-react';

interface TaskSectionProps {
  tasks: Task[];
  ticketHistory: any[];
  onToggleTask: (taskId: string) => void;
  onCreateTasks: (prompt: string, title: string) => void;
  onSelectTicket: (ticketId: string) => void;
  onToggleTicketStatus: (ticketId: string, completed: boolean) => void;
  isProcessing: boolean;
}

const TaskSection: React.FC<TaskSectionProps> = ({ 
  tasks, 
  ticketHistory,
  onToggleTask, 
  onCreateTasks,
  onSelectTicket,
  onToggleTicketStatus,
  isProcessing
}) => {
  const [taskPrompt, setTaskPrompt] = useState('');
  const [activeTab, setActiveTab] = useState<'tasks' | 'history'>('tasks');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskPrompt.trim() === '') return;
    
    // Use the first line or first few words as the title
    const title = taskPrompt.split('\n')[0].trim().substring(0, 50) + 
      (taskPrompt.split('\n')[0].trim().length > 50 ? '...' : '');
    
    onCreateTasks(taskPrompt, title);
    setTaskPrompt('');
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg border border-gray-200">
      <div className="flex items-center mb-6">
        <ClipboardList className="text-[#0040D1] mr-3" size={28} />
        <h2 className="text-2xl font-semibold text-[#0040D1]">Ticket Manager</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <label htmlFor="task-input" className="block text-sm font-medium text-gray-700 mb-2">
          Enter the ticket
        </label>
        <div className="flex">
          <textarea
            id="task-input"
            value={taskPrompt}
            onChange={(e) => setTaskPrompt(e.target.value)}
            placeholder="Enter the ticket that you want to convert into tasks..."
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0040D1] min-h-[100px] resize-y"
            disabled={isProcessing}
          />
        </div>
        <button
          type="submit"
          className={`mt-3 w-full p-3 rounded-lg ${
            isProcessing || taskPrompt.trim() === ''
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-secondary hover:bg-secondary-dark'
          } text-white transition-colors flex items-center justify-center`}
          disabled={isProcessing || taskPrompt.trim() === ''}
        >
          <PlusCircle size={20} className="mr-2" />
          {isProcessing ? 'Processing Ticket...' : 'Convert to Tasks'}
        </button>
      </form>
      
      <div className="mb-4 border-b border-gray-200">
        <div className="flex">
          <button
            className={`py-2 px-4 font-medium text-sm ${
              activeTab === 'tasks' 
                ? 'text-secondary border-b-2 border-secondary' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('tasks')}
          >
            Current Tasks
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm ${
              activeTab === 'history' 
                ? 'text-secondary border-b-2 border-secondary' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('history')}
          >
            Ticket History
          </button>
        </div>
      </div>
      
      {activeTab === 'tasks' ? (
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Task List</h3>
          <TaskList tasks={tasks} onToggleTask={onToggleTask} />
        </div>
      ) : (
        <div>
          <div className="flex items-center mb-4">
            <History size={18} className="text-gray-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-800">Previous Tickets</h3>
          </div>
          <TicketHistory 
            ticketHistory={ticketHistory} 
            onSelectTicket={onSelectTicket}
            onToggleTicketStatus={onToggleTicketStatus}
          />
        </div>
      )}
    </div>
  );
};

export default TaskSection;