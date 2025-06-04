import { Request, Response } from "express";
import { TaskStorage } from "../services/taskStorage";
import { ApiResponse, Task, TaskFilters } from "../types/task";
import { RequestWithOrigin } from "../middleware/originDetection";

export class TaskController {
  static async getAllTasks(
    req: Request,
    res: Response<ApiResponse<Task[]>>
  ): Promise<void> {
    try {
      const { status, priority, search } = req.query;

      const filters: TaskFilters = {
        status: status
          ? typeof status === "string"
            ? (status.split(",") as any)
            : (status as any)
          : undefined,
        priority: priority
          ? typeof priority === "string"
            ? (priority.split(",") as any)
            : (priority as any)
          : undefined,
        search: search as string,
      };

      const tasks = await TaskStorage.getAllTasks(filters);

      res.json({
        success: true,
        data: tasks,
      });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({
        success: false,
        error: "Failed to fetch tasks",
      });
    }
  }

  static async getTaskById(
    req: Request,
    res: Response<ApiResponse<Task>>
  ): Promise<void> {
    try {
      const { id } = req.params;
      const task = await TaskStorage.getTaskById(id);

      if (!task) {
        res.status(404).json({
          success: false,
          error: "Task not found",
        });
        return;
      }

      res.json({
        success: true,
        data: task,
      });
    } catch (error) {
      console.error("Error fetching task:", error);
      res.status(500).json({
        success: false,
        error: "Failed to fetch task",
      });
    }
  }
  static async createTask(
    req: RequestWithOrigin,
    res: Response<ApiResponse<Task>>
  ): Promise<void> {
    try {
      const taskData = req.body;
      const originFramework = req.originFramework || "astro";
      const newTask = await TaskStorage.createTask(taskData, originFramework);

      res.status(201).json({
        success: true,
        data: newTask,
        message: "Task created successfully",
      });
    } catch (error) {
      console.error("Error creating task:", error);
      const message =
        error instanceof Error ? error.message : "Failed to create task";

      res.status(400).json({
        success: false,
        error: message,
      });
    }
  }
  static async updateTask(
    req: RequestWithOrigin,
    res: Response<ApiResponse<Task>>
  ): Promise<void> {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const originFramework = req.originFramework || "astro";

      const updatedTask = await TaskStorage.updateTask(id, updateData, originFramework);

      if (!updatedTask) {
        res.status(404).json({
          success: false,
          error: "Task not found",
        });
        return;
      }

      res.json({
        success: true,
        data: updatedTask,
        message: "Task updated successfully",
      });
    } catch (error) {
      console.error("Error updating task:", error);
      const message =
        error instanceof Error ? error.message : "Failed to update task";

      res.status(400).json({
        success: false,
        error: message,
      });
    }
  }

  static async deleteTask(
    req: Request,
    res: Response<ApiResponse>
  ): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await TaskStorage.deleteTask(id);

      if (!deleted) {
        res.status(404).json({
          success: false,
          error: "Task not found",
        });
        return;
      }

      res.json({
        success: true,
        message: "Task deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({
        success: false,
        error: "Failed to delete task",
      });
    }
  }
}
