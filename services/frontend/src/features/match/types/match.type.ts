import type {
  Category,
  Difficulty,
  QuestionType,
} from "@/features/questions/types/question.type";

export enum Language {
  CoffeeScript = "coffescript",
  Cpp = "cpp",
  CSharp = "csharp",
  Java = "java",
  JavaScript = "javascript",
  Php = "php",
  Python = "python",
  Ruby = "ruby",
  TypeScript = "typescript",
}

export type MatchRequest = {
  difficulty: Difficulty;
  language: Language;
  categories: Category[];
};

export type MatchDetails = {
  question: QuestionType | undefined;
  roomId: string | undefined;
  language: Language | undefined;
};