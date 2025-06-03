export type Priority = 'high' | 'medium' | 'low';
export type Status = 'pending' | 'in_progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description?: string;
  due_date: string; // DD/MM/YYYY format
  priority: Priority;
  status: Status;
  created_at: string;
  updated_at: string;
}

export interface CreateTaskData {
  title: string;
  description?: string;
  due_date: string;
  priority: Priority;
  status: Status;
}

export interface UpdateTaskData extends Partial<CreateTaskData> {
  id: string;
}

export interface TaskFilters {
  status?: Status[];
  priority?: Priority[];
}
