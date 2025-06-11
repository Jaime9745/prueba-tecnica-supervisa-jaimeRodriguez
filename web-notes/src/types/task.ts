export type Priority = "high" | "medium" | "low";
export type Status = "pending" | "in_progress" | "completed";

export interface Task {
  id: string;
  name: string;
  data?: Record<string, any>;
}

export interface CreateTaskData {
  title: string;
  description?: string;
  due_date?: string;
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
