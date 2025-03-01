import { Task, TicketHistory } from '../types';
import { v4 as uuidv4 } from 'uuid';


const TASKS_STORAGE_KEY = 'clustox_ticket_manager_tasks';
const TICKET_HISTORY_KEY = 'clustox_ticket_manager_history';


export const saveTasks = (tasks: Task[]): void => {
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
};


export const loadTasks = (): Task[] => {
  const tasksJson = localStorage.getItem(TASKS_STORAGE_KEY);
  if (!tasksJson) return [];
  
  try {
    return JSON.parse(tasksJson);
  } catch (error) {
    console.error('Error parsing tasks from local storage:', error);
    return [];
  }
};


export const saveTicketHistory = (ticketHistory: TicketHistory[]): void => {
  localStorage.setItem(TICKET_HISTORY_KEY, JSON.stringify(ticketHistory));
};


export const loadTicketHistory = (): TicketHistory[] => {
  const historyJson = localStorage.getItem(TICKET_HISTORY_KEY);
  if (!historyJson) return [];
  
  try {
    return JSON.parse(historyJson);
  } catch (error) {
    console.error('Error parsing ticket history from local storage:', error);
    return [];
  }
};


export const addTicketToHistory = (title: string, tasks: Task[]): TicketHistory => {
  const newTicket: TicketHistory = {
    id: uuidv4(),
    title,
    tasks: [...tasks],
    timestamp: Date.now(),
    completed: false
  };
  
  const history = loadTicketHistory();
  const updatedHistory = [newTicket, ...history];
  saveTicketHistory(updatedHistory);
  
  return newTicket;
};

// Update ticket completion status in history
export const updateTicketStatus = (ticketId: string, completed: boolean): void => {
  const history = loadTicketHistory();
  const updatedHistory = history.map(ticket => 
    ticket.id === ticketId ? { ...ticket, completed } : ticket
  );
  saveTicketHistory(updatedHistory);
};


export const generateTaskPrompt = (userInput: string): string => {
  return `
    Convert the following project manager ticket into a JSON array of tasks.
    Each task should be represented as an object with a single key "task" containing a string description. The description should be well defined.
    Return ONLY a valid JSON array with no additional text, explanations, or extra characters.
    If no tasks are identified, return an empty JSON array (i.e., []).
    Ensure that the output is strictly valid JSON.

    Ticket: "${userInput}"
  `;
};


// Process the LLM response into Task objects
export const processTaskResponse = (response: string): Task[] => {
  try {
    // Try to extract JSON from the response
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    const jsonString = jsonMatch ? jsonMatch[0] : response;
    
    // Clean the JSON string to remove any potential formatting issues
    const cleanedJsonString = jsonString
      .replace(/\n/g, '')
      .replace(/\r/g, '')
      .replace(/\t/g, '')
      .replace(/\\/g, '\\\\')
      .replace(/\\"/g, '\\"')
      .trim();
    
    // Parse the JSON
    const parsedTasks = JSON.parse(cleanedJsonString);
    
    // Validate and transform the tasks
    return parsedTasks.map((item: any) => ({
      id: uuidv4(),
      task: typeof item.task === 'string' ? item.task : String(item),
      completed: false
    }));
  } catch (error) {
    console.error('Error processing task response:', error, response);
    
    // Fallback: try to extract tasks line by line
    const lines = response.split('\n').filter(line => line.trim());
    
    // Look for task descriptions in the lines
    return lines
      .filter(line => {
        // Filter out lines that are likely not task descriptions
        const trimmedLine = line.trim();
        return trimmedLine && 
               !trimmedLine.startsWith('[') && 
               !trimmedLine.startsWith(']') && 
               !trimmedLine.startsWith('{') && 
               !trimmedLine.startsWith('}');
      })
      .map(line => {
        // Extract task description from the line
        let taskText = line.replace(/^[-*•]|\d+[.)]/, '').trim();
        
        // Try to extract task from JSON-like format if present
        const taskMatch = line.match(/"task"\s*:\s*"([^"]*)"/);
        if (taskMatch && taskMatch[1]) {
          taskText = taskMatch[1];
        }
        
        return {
          id: uuidv4(),
          task: taskText,
          completed: false
        };
      });
  }
};

// Format date for display
export const formatDate = (timestamp: number): string => {
  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};