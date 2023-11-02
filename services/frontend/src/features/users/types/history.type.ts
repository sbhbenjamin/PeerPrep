import type { QuestionType } from "@/features/questions";

export type History = {
  id: number;
  userId: number;
  questionId: string;
  timestamp: Date;
  question: QuestionType;
};

export type HistoryFilter = {
  userId?: number;
  questionId?: string;
};
