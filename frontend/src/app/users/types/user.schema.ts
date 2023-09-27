import * as z from 'zod';

export const UserSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    url: z.string().url().nullish(),
    bio: z.string().max(3500).nullish()
  });