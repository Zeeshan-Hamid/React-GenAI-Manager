import React from 'react';
import { Task } from '../types';
import { CheckCircle, Circle } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleTask }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center text-gray-500 py-6">
        <p>No tasks yet. Enter a project ticket to get started!</p>
        <p className="text-sm mt-2">Try: "Create a responsive landing page with contact form and product showcase"</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div 
          key={task.id}
          className="flex items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <button
            onClick={() => onToggleTask(task.id)}
            className="flex items-center focus:outline-none"
            aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
          >
            {task.completed ? (
              <CheckCircle className="text-[#00C26C] h-6 w-6 mr-3 flex-shrink-0" />
            ) : (
              <Circle className="text-gray-400 h-6 w-6 mr-3 flex-shrink-0" />
            )}
          </button>
          <span className={`${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
            {task.task}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TaskList;