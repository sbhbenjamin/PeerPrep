import * as z from 'zod';

export const UserSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    image: z.any(),
  });