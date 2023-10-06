import { NextFunction, Request, Response } from 'express';

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Handle the error here and send an appropriate response
  console.error(error); // Log the error for debugging purposes
  // Customize the response based on the error
  res.status(500).json({ error: error.message });
}
