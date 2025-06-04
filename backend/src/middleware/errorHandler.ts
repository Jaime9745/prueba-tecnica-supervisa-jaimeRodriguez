import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { ApiResponse } from "../types/task";

export const handleValidationErrors = (
  req: Request,
  res: Response<ApiResponse>,
  next: NextFunction
): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      error: "Validation failed",
      data: errors.array(),
    });
    return;
  }

  next();
};

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response<ApiResponse>,
  next: NextFunction
): void => {
  console.error("Error:", error);

  const isDevelopment = process.env.NODE_ENV === "development";

  res.status(500).json({
    success: false,
    error: "Internal server error",
    ...(isDevelopment && { data: error.message }),
  });
};

export const notFoundHandler = (
  req: Request,
  res: Response<ApiResponse>
): void => {
  res.status(404).json({
    success: false,
    error: `Route ${req.originalUrl} not found`,
  });
};
