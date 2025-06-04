import { Task, CreateTaskData, TaskFilters } from "../types/task";
import { promises as fs } from "fs";
import path from "path";

export class TaskStorage {
  private static tasksFilePath = path.join(process.cwd(), "data", "tasks.json");

  static async ensureDataDirectory(): Promise<void> {
    const dataDir = path.join(process.cwd(), "data");
    try {
      await fs.access(dataDir);
    } catch {
      await fs.mkdir(dataDir, { recursive: true });
    }
  }

  static async ensureTasksFile(): Promise<void> {
    await this.ensureDataDirectory();
    try {
      await fs.access(this.tasksFilePath);
    } catch {
      await fs.writeFile(this.tasksFilePath, JSON.stringify([], null, 2));
    }
  }

  static async getAllTasks(filters?: TaskFilters): Promise<Task[]> {
    await this.ensureTasksFile();
    try {
      const data = await fs.readFile(this.tasksFilePath, "utf-8");
      let tasks: Task[] = JSON.parse(data);

      // Apply filters
      if (filters) {
        if (filters.status && filters.status.length > 0) {
          tasks = tasks.filter((task) => filters.status!.includes(task.status));
        }

        if (filters.priority && filters.priority.length > 0) {
          tasks = tasks.filter((task) =>
            filters.priority!.includes(task.priority)
          );
        }

        if (filters.search) {
          const searchTerm = filters.search.toLowerCase();
          tasks = tasks.filter(
            (task) =>
              task.title.toLowerCase().includes(searchTerm) ||
              task.description?.toLowerCase().includes(searchTerm)
          );
        }
      }

      return tasks;
    } catch (error) {
      console.error("Error reading tasks:", error);
      return [];
    }
  }

  static async getTaskById(taskId: string): Promise<Task | null> {
    const tasks = await this.getAllTasks();
    return tasks.find((task) => task.task_id === taskId) || null;
  }
  static async createTask(
    taskData: CreateTaskData,
    originFramework: string = "astro"
  ): Promise<Task> {
    const tasks = await this.getAllTasks();

    // Check if title already exists
    const existingTask = tasks.find(
      (task) => task.title.toLowerCase() === taskData.title.toLowerCase()
    );
    if (existingTask) {
      throw new Error("A task with this title already exists");
    }

    const newTask: Task = {
      task_id: Date.now().toString(),
      ...taskData,
      origin_framework: originFramework,
      user_email: "2220211014@estudiantesunibague.edu.co",
    };

    tasks.push(newTask);
    await this.saveTasks(tasks);
    return newTask;
  }
  static async updateTask(
    taskId: string,
    updateData: Partial<CreateTaskData>,
    originFramework?: string
  ): Promise<Task | null> {
    const tasks = await this.getAllTasks();
    const taskIndex = tasks.findIndex((task) => task.task_id === taskId);

    if (taskIndex === -1) {
      return null;
    }

    // If title is being updated, check for duplicates
    if (updateData.title) {
      const existingTask = tasks.find(
        (task) =>
          task.title.toLowerCase() === updateData.title!.toLowerCase() &&
          task.task_id !== taskId
      );
      if (existingTask) {
        throw new Error("A task with this title already exists");
      }
    }

    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...updateData,
      // Update origin_framework if provided
      ...(originFramework && { origin_framework: originFramework }),
    };

    await this.saveTasks(tasks);
    return tasks[taskIndex];
  }

  static async deleteTask(taskId: string): Promise<boolean> {
    const tasks = await this.getAllTasks();
    const filteredTasks = tasks.filter((task) => task.task_id !== taskId);

    if (filteredTasks.length === tasks.length) {
      return false; // Task not found
    }

    await this.saveTasks(filteredTasks);
    return true;
  }

  private static async saveTasks(tasks: Task[]): Promise<void> {
    await fs.writeFile(this.tasksFilePath, JSON.stringify(tasks, null, 2));
  }
}
