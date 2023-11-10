import type { Difficulty } from "@prisma/client";

export type QuestionRecord = {
  id: string;
  title: string;
  categories: string[];
  difficulty: Difficulty;
  description: string;
  link: string;
};

export type QuestionRequest = Omit<QuestionRecord, "id">;

export type QuestionFilter = Partial<
  Omit<QuestionRecord, "description" | "link">
>;
