import type { NextFunction, Request, Response } from "express";

import {
  DeleteHistorySchema,
  HistoryRecordWithoutIdAndTimestampSchema,
  UpdateHistorySchema,
} from "../../commons/types/history-schema";

// Middleware to validate addHistory input
export function validateAddHistoryInput(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  try {
    HistoryRecordWithoutIdAndTimestampSchema.parse(req.body);
    next();
  } catch (e: any) {
    res.status(400).json({ error: e.errors });
  }
}

// Middleware to validate updateHistory input
export function validateUpdateHistoryInput(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  try {
    UpdateHistorySchema.parse({
      id: parseInt(req.params.id, 10),
      ...req.body,
    });
    next();
  } catch (e: any) {
    res.status(400).json({ error: e.errors });
  }
}

export function validateDeleteHistoryInput(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  try {
    // Validate that ID is present
    if (!req.params.id) {
      throw new Error("ID is required");
    }

    // Validate the input
    DeleteHistorySchema.parse({
      id: parseInt(req.params.id, 10),
    });

    // Continue to the next middleware if validation is successful
    next();
  } catch (e: any) {
    // Return 400 Bad Request if validation fails
    res.status(400).json({ error: e.message });
  }
}
