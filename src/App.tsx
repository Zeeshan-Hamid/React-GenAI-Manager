import React, { useState, useEffect } from 'react';
import Groq from 'groq-sdk';
import Header from './components/Header';
import TaskSection from './components/TaskSection';
import { Task, TicketHistory } from './types';
import { 
  loadTasks, 
  saveTasks, 
  generateTaskPrompt, 
  processTaskResponse,
  loadTicketHistory,
  addTicketToHistory,
  updateTicketStatus
} from './utils/taskUtils';


const groq = new Groq({
  apiKey: import.meta.env.VITE_REACT_APP_GROQ_API_KEY,
  dangerouslyAllowBrowser: true, // Note: In production, API calls should be moved to a backend
});

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [ticketHistory, setTicketHistory] = useState<TicketHistory[]>([]);
  const [isProcessingTasks, setIsProcessingTasks] = useState(false);
  const [currentTicketId, setCurrentTicketId] = useState<string | null>(null);

  
  useEffect(() => {
    const savedTasks = loadTasks();
    setTasks(savedTasks);
    
    const savedHistory = loadTicketHistory();
    setTicketHistory(savedHistory);
  }, []);


  useEffect(() => {
    saveTasks(tasks);
    
    
    if (currentTicketId) {
      const allCompleted = tasks.length > 0 && tasks.every(task => task.completed);
      updateTicketStatus(currentTicketId, allCompleted);
      
     
      setTicketHistory(prevHistory => 
        prevHistory.map(ticket => 
          ticket.id === currentTicketId 
            ? { ...ticket, completed: allCompleted } 
            : ticket
        )
      );
    }
  }, [tasks, currentTicketId]);

  const handleCreateTasks = async (taskPrompt: string, title: string) => {
    if (taskPrompt.trim() === '') return;
    
    setIsProcessingTasks(true);
    
    try {
      const prompt = generateTaskPrompt(taskPrompt);
      
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        model: 'llama3-8b-8192',
      });

      const responseContent = completion.choices[0]?.message?.content || '';
      console.log(responseContent)
      const newTasks = processTaskResponse(responseContent);
      
      
      const newTicket = addTicketToHistory(title, newTasks);
      setTicketHistory(prevHistory => [newTicket, ...prevHistory]);
      setCurrentTicketId(newTicket.id);
      

      setTasks(newTasks);
    } catch (error) {
      console.error('Error processing tasks:', error);
      alert('Error processing ticket. Please try again.');
    } finally {
      setIsProcessingTasks(false);
    }
  };

  const handleToggleTask = (taskId: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, completed: !task.completed } 
          : task
      )
    );
  };
  
  const handleSelectTicket = (ticketId: string) => {
    const selectedTicket = ticketHistory.find(ticket => ticket.id === ticketId);
    if (selectedTicket) {
      setTasks(selectedTicket.tasks);
      setCurrentTicketId(ticketId);
    }
  };
  
  const handleToggleTicketStatus = (ticketId: string, completed: boolean) => {
    // Update in local storage
    updateTicketStatus(ticketId, completed);
    
    // Update in state
    setTicketHistory(prevHistory => 
      prevHistory.map(ticket => 
        ticket.id === ticketId 
          ? { ...ticket, completed } 
          : ticket
      )
    );
    
    // If this is the current ticket, update all tasks to match
    if (ticketId === currentTicketId) {
      setTasks(prevTasks => 
        prevTasks.map(task => ({ ...task, completed }))
      );
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      
      <div className="flex-grow overflow-y-auto p-4 md:p-6">
        <div className="container mx-auto max-w-3xl">
          <TaskSection 
            tasks={tasks} 
            ticketHistory={ticketHistory}
            onToggleTask={handleToggleTask} 
            onCreateTasks={handleCreateTasks}
            onSelectTicket={handleSelectTicket}
            onToggleTicketStatus={handleToggleTicketStatus}
            isProcessing={isProcessingTasks}
          />
        </div>
      </div>
    </div>
  );
}

export default App;