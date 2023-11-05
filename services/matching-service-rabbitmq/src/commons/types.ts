export type Match = {
  socketId: string;
  difficulty: Difficulty;
  categories: Category[];
  language: Language;
};

export type MatchWithSingleCategory = {
  socketId: string;
  difficulty: Difficulty;
  categories: Category;
  language: Language;
};

export enum Difficulty {
  Easy,
  Medium,
  Hard,
}

export enum Category {
  Strings,
  Algorithms,
  DataStructures,
  BitManipulation,
  Recursion,
  Databases,
  Brainteaser,
  Arrays,
}

export enum Language {
  CoffeeScript,
  Cpp,
  CSharp,
  Java,
  JavaScript,
  Php,
  Python,
  Ruby,
  TypeScript,
}

export const DIFFICULTIES = ["easy", "medium", "hard"];
