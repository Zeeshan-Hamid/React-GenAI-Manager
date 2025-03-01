export interface Task {
  id: string;
  task: string;
  completed: boolean;
}

export interface TicketHistory {
  id: string;
  title: string;
  tasks: Task[];
  timestamp: number;
  completed: boolean;
}