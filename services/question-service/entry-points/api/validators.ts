import { Request, Response, NextFunction } from 'express';
import {AddQuestionSchema, UpdateQuestionSchema} from '../../domain/question-schema';

// Middleware to validate addUser input
export function validateAddQuestionInput(req: Request, res: Response, next: NextFunction): void {
    try {
      AddQuestionSchema.parse(req.body);
      next();
    } catch (e: any) {
      res.status(400).json({ error: e.errors });
    }
}
  
  // Middleware to validate updateUser input
export function validateUpdateQuestionInput(req: Request, res: Response, next: NextFunction): void {
    try {
        UpdateQuestionSchema.parse({
        id: req.params.id,
        ...req.body,
        });
        next();
    } catch (e : any) {
        res.status(400).json({ error: e.errors });
    }
}
