import { z } from 'zod';

// Define the UserRecord schema
export const UserRecordSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string(),
  bio: z.string().max(300).nullish(),
  url: z.string().url().nullish()
});

// Schema for the addUser function
export const AddUserSchema = UserRecordSchema.omit({ id: true });

// Schema for the updateUser function
export const UpdateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  bio: z.string().max(300).optional(),
  url: z.string().url().optional()
});

export const userIdSchema = z.number().int();
