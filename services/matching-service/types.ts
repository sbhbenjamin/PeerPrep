export interface Match {
  id: number;
  difficulty: string;
  category: string;
  sockAddr: string;
}

export const CATEGORIES = [
  "strings",
  "algorithms",
  "datastructures",
  "bitmanipulation",
  "recursion",
  "databases",
  "brainteaser",
  "arrays",
];

export const DIFFICULTIES = ["easy", "medium", "hard"];
