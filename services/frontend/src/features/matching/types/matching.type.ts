import type {
  Category,
  Difficulty,
} from "@/features/questions/types/question.type";

export enum Language {
  COFFEESCRIPT = "coffescript",
  CPP = "cpp",
  CSHARP = "csharp",
  JAVA = "java",
  JAVASCRIPT = "javascript",
  PHP = "php",
  PYTHON = "python",
  RUBY = "ruby",
  TYPESCRIPT = "typescript",
}

export type MatchRequest = {
  difficulty: Difficulty;
  language: Language;
  categories: Category[];
};
