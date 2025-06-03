import type { Task, CreateTaskData } from "../types/task";
import { promises as fs } from "fs";
import path from "path";

const TASKS_FILE_PATH = path.join(process.cwd(), "data", "tasks.json");

export class TaskStorage {
  static async ensureDataDirectory() {
    const dataDir = path.join(process.cwd(), "data");
    try {
      await fs.access(dataDir);
    } catch {
      await fs.mkdir(dataDir, { recursive: true });
    }
  }

  static async ensureTasksFile() {
    await this.ensureDataDirectory();
    try {
      await fs.access(TASKS_FILE_PATH);
    } catch {
      await fs.writeFile(TASKS_FILE_PATH, JSON.stringify([], null, 2));
    }
  }

  static async getAllTasks(): Promise<Task[]> {
    await this.ensureTasksFile();
    try {
      const data = await fs.readFile(TASKS_FILE_PATH, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error reading tasks:", error);
      return [];
    }
  }

  static async saveTask(taskData: CreateTaskData): Promise<Task> {
    const tasks = await this.getAllTasks();

    // Check if title already exists
    const existingTask = tasks.find(
      (task) => task.title.toLowerCase() === taskData.title.toLowerCase()
    );
    if (existingTask) {
      throw new Error("A task with this title already exists");
    }

    const newTask: Task = {
      id: Date.now().toString(),
      ...taskData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    tasks.push(newTask);
    await this.saveTasks(tasks);
    return newTask;
  }

  static async updateTask(
    id: string,
    updateData: Partial<CreateTaskData>
  ): Promise<Task | null> {
    const tasks = await this.getAllTasks();
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      return null;
    }

    // If title is being updated, check for duplicates
    if (updateData.title) {
      const existingTask = tasks.find(
        (task) =>
          task.title.toLowerCase() === updateData.title!.toLowerCase() &&
          task.id !== id
      );
      if (existingTask) {
        throw new Error("A task with this title already exists");
      }
    }

    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...updateData,
      updated_at: new Date().toISOString(),
    };

    await this.saveTasks(tasks);
    return tasks[taskIndex];
  }

  static async deleteTask(id: string): Promise<boolean> {
    const tasks = await this.getAllTasks();
    const filteredTasks = tasks.filter((task) => task.id !== id);

    if (filteredTasks.length === tasks.length) {
      return false; // Task not found
    }

    await this.saveTasks(filteredTasks);
    return true;
  }

  static async getTaskById(id: string): Promise<Task | null> {
    const tasks = await this.getAllTasks();
    return tasks.find((task) => task.id === id) || null;
  }

  private static async saveTasks(tasks: Task[]): Promise<void> {
    await fs.writeFile(TASKS_FILE_PATH, JSON.stringify(tasks, null, 2));
  }
}
