import { z } from 'zod';

// Define the UserRecord schema
export const UserRecordSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string(),
  image: z.string().optional(),
});

// Schema for the addUser function
export const AddUserSchema = UserRecordSchema.omit({ id: true });

// Schema for the updateUser function
export const UpdateUserSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().optional(),
  image: z.string().nullable().optional(),
});

export const userIdSchema = z.number().int();
