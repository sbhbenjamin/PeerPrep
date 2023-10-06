import { z } from 'zod';
import { Category, Difficulty } from '../types'

const CategorySchema = z.nativeEnum(Category);

// Define the UserRecord schema
export const QuestionRecordSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.array(CategorySchema),
  description: z.string(),
  difficulty: z.nativeEnum(Difficulty),
  url: z.string().url()
});

// Schema for the addUser funqction
export const AddQuestionSchema = QuestionRecordSchema.omit({ id: true });

// Schema for the updateUser function
export const UpdateQuestionSchema = QuestionRecordSchema.omit({ id: true }).partial();
