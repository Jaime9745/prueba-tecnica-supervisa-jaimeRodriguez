import { Request, Response, NextFunction } from "express";

export interface RequestWithOrigin extends Request {
  originFramework?: string;
}

export const detectOriginFramework = (
  req: RequestWithOrigin,
  res: Response,
  next: NextFunction
) => {
  // Check User-Agent to detect if it's from Flutter/Dart
  const userAgent = req.get("User-Agent") || "";

  // Check for custom header that mobile app can send
  const customOrigin = req.get("X-Origin-Framework");

  if (customOrigin) {
    // If custom header is present, use it
    req.originFramework = customOrigin;
  } else if (userAgent.includes("Dart/")) {
    // If User-Agent contains "Dart/"
    req.originFramework = "flutter";
  } else {
    // Default to astro for web requests
    req.originFramework = "astro";
  }

  next();
};
