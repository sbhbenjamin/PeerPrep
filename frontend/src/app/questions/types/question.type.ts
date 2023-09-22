export interface QuestionType {
  id: string;
  title: string;
  categories: Category[];
  difficulty: Difficulty;
  description: string;
  link: string;
}

export interface QuestionDescription {
  id: string;
  description: string;
}

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
