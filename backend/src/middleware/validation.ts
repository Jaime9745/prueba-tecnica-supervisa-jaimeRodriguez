import { body, param, query } from "express-validator";

export const validateCreateTask = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 150 })
    .withMessage("Title must be 150 characters or less"),
  body("description")
    .optional()
    .isLength({ max: 1000 })
    .withMessage("Description must be 1000 characters or less"),
  body("due_date")
    .optional({ values: "falsy" })
    .matches(/^\d{2}\/\d{2}\/\d{4}$/)
    .withMessage("Due date must be in DD/MM/YYYY format"),

  body("priority")
    .isIn(["high", "medium", "low"])
    .withMessage("Priority must be high, medium, or low"),

  body("status")
    .isIn(["pending", "in_progress", "completed"])
    .withMessage("Status must be pending, in_progress, or completed"),
];

export const validateUpdateTask = [
  param("id").notEmpty().withMessage("Task ID is required"),

  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isLength({ max: 150 })
    .withMessage("Title must be 150 characters or less"),

  body("description")
    .optional()
    .isLength({ max: 1000 })
    .withMessage("Description must be 1000 characters or less"),
  body("due_date")
    .optional({ values: "falsy" })
    .matches(/^\d{2}\/\d{2}\/\d{4}$/)
    .withMessage("Due date must be in DD/MM/YYYY format"),

  body("priority")
    .optional()
    .isIn(["high", "medium", "low"])
    .withMessage("Priority must be high, medium, or low"),

  body("status")
    .optional()
    .isIn(["pending", "in_progress", "completed"])
    .withMessage("Status must be pending, in_progress, or completed"),
];

export const validateTaskId = [
  param("id").notEmpty().withMessage("Task ID is required"),
];
