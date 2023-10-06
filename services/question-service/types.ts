export type QuestionRecord = {
  id: string,
  title: string,
  category: string[],
  difficulty: string,
  description: string,
  url: string
};

export type QuestionRequest = Omit<QuestionRecord, 'id'>;

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
