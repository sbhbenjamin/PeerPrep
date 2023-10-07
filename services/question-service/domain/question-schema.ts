import { z } from 'zod';
import { Category, Difficulty } from '../types'

const CategorySchema = z.nativeEnum(Category);

export const QuestionRecordSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.array(CategorySchema),
  description: z.string(),
  difficulty: z.nativeEnum(Difficulty),
  url: z.string().url()
});

export const AddQuestionSchema = QuestionRecordSchema.omit({ id: true });

export const GetQuestionSchema = QuestionRecordSchema.omit({description: true, url: true}).partial();

export const UpdateQuestionSchema = QuestionRecordSchema.omit({ id: true }).partial();
