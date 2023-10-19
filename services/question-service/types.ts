import type { Category, Difficulty } from "@prisma/client";

export type QuestionRecord = {
  id: string;
  title: string;
  categories: Category[];
  difficulty: Difficulty;
  description: string;
  link: string;
};

export type QuestionRequest = Omit<QuestionRecord, "id">;

export type QuestionFilter = Partial<
  Omit<QuestionRecord, "description" | "link">
>;
