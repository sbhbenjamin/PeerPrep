export type History = {
  id: number;
  userId: number;
  questionId: string;
  timestamp: Date;
};

export type HistoryFilter = {
  userId?: number;
  questionId?: string;
};

export type HistoryWithoutId = Omit<History, "id" | "timestamp">;

export type UpdateHistory = Partial<HistoryWithoutId>;
