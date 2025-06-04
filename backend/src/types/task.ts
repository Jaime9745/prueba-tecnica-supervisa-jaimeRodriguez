export type Priority = "high" | "medium" | "low";
export type Status = "pending" | "in_progress" | "completed";

export interface Task {
  task_id: string;
  title: string;
  description?: string;
  due_date?: string; // DD/MM/YYYY format
  priority: Priority;
  status: Status;
  origin_framework: string;
  user_email: string;
}

export interface CreateTaskData {
  title: string;
  description?: string;
  due_date?: string;
  priority: Priority;
  status: Status;
}

export interface UpdateTaskData extends Partial<CreateTaskData> {}

export interface TaskFilters {
  status?: Status[];
  priority?: Priority[];
  search?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
