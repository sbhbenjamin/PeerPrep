/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-cycle
import { queues } from "../start";
import { CATEGORIES, DIFFICULTIES } from "../types";

export function extractDifficulty(difficulty: string) {
  difficulty = difficulty.toLowerCase();
  if (DIFFICULTIES.includes(difficulty)) {
    return difficulty;
  }
  return undefined;
}

export function extractCategory(category: string) {
  category = category.toLowerCase();
  if (CATEGORIES.includes(category)) {
    return category;
  }
  return undefined;
}

export function checkIdExists(id: number) {
  const matches = Array.from(queues.entries());
  const res = matches.find((element) => element[1].id === id);
  return res !== undefined;
}
