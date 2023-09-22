import { Difficulty } from "../types/question.type";

export const difficultyColors = {
  [Difficulty.Easy]: "bg-green-700 hover:bg-green-900",
  [Difficulty.Medium]: "bg-yellow-700 hover:bg-yellow-900",
  [Difficulty.Hard]: "bg-red-700 hover:bg-red-900",
};
