import { Router } from "express";
import { TaskController } from "../controllers/taskController";
import {
  validateCreateTask,
  validateUpdateTask,
  validateTaskId,
} from "../middleware/validation";
import { handleValidationErrors } from "../middleware/errorHandler";

const router = Router();

// GET /api/tasks - Get all tasks with optional filters
router.get("/", TaskController.getAllTasks);

// GET /api/tasks/:id - Get task by ID
router.get(
  "/:id",
  validateTaskId,
  handleValidationErrors,
  TaskController.getTaskById
);

// POST /api/tasks - Create new task
router.post(
  "/",
  validateCreateTask,
  handleValidationErrors,
  TaskController.createTask
);

// PUT /api/tasks/:id - Update task
router.put(
  "/:id",
  validateUpdateTask,
  handleValidationErrors,
  TaskController.updateTask
);

// DELETE /api/tasks/:id - Delete task
router.delete(
  "/:id",
  validateTaskId,
  handleValidationErrors,
  TaskController.deleteTask
);

export default router;
