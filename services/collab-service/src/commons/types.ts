export type QuestionRecord = {
  id: string;
  title: string;
  category: string[];
  difficulty: string;
  description: string;
  url: string;
};

export type QuestionRequest = Omit<QuestionRecord, "id">;

export type QuestionFilter = {
  id: string | undefined;
  title: string | undefined;
  difficulty: string | undefined;
  categories: string[] | undefined;
};

export type Message = {
  userId: string;
  content: string;
};

export enum Difficulty {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard",
}

export enum Category {
  Strings = "Strings",
  Algorithms = "Algorithms",
  DataStructures = "DataStructures",
  BitManipulation = "BitManipulation",
  Recursion = "Recursion",
  Databases = "Databases",
  Brainteaser = "Brainteaser",
  Arrays = "Arrays",
}
