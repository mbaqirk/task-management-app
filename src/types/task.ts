
export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE'; 
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  deadline: string;
  duration: number; // in minutes
  createdAt: string;
  updatedAt: string;
}