export type Match = {
  id: number;
  difficulty: Difficulty;
  categories: Category[];
  sockAddr: string;
  language: Language;
};

export type MatchRequest = Omit<Match, "sockAddr">;

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
