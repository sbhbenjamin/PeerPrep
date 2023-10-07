import { Request, Response, NextFunction } from 'express'
import { AddUserSchema, UpdateUserSchema } from '../../domain/user-schema'

// Middleware to validate addUser input
export function validateAddUserInput(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  try {
    AddUserSchema.parse(req.body)
    next()
  } catch (e: any) {
    res.status(400).json({ error: e.errors })
  }
}

// Middleware to validate updateUser input
export function validateUpdateUserInput(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  try {
    UpdateUserSchema.parse({
      id: parseInt(req.params.id, 10),
      ...req.body,
    })
    next()
  } catch (e: any) {
    res.status(400).json({ error: e.errors })
  }
}
