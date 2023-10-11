import type { QuestionType } from "../types/question.type";
import { Category, Difficulty } from "../types/question.type";

export const questionsStub: QuestionType[] = [
  {
    id: 1,
    title: "Reverse a String",
    categories: [Category.Strings, Category.Algorithms],
    difficulty: Difficulty.Easy,
    link: "https://leetcode.com/problems/reverse-string/",
  },
  {
    id: 2,
    title: "Detect Cycle in a Linked List",
    categories: [Category.DataStructures, Category.Algorithms],
    difficulty: Difficulty.Medium,
    link: "https://leetcode.com/problems/linked-list-cycle/",
  },
  {
    id: 3,
    title: "Convert Roman to Integer",
    categories: [Category.Algorithms],
    difficulty: Difficulty.Medium,
    link: "https://leetcode.com/problems/roman-to-integer/",
  },
  {
    id: 4,
    title: "Add Binary Numbers",
    categories: [Category.BitManipulation, Category.Algorithms],
    difficulty: Difficulty.Hard,
    link: "https://leetcode.com/problems/add-binary/",
  },
  {
    id: 5,
    title: "Compute nth Fibonacci Number",
    categories: [Category.Recursion, Category.Algorithms],
    difficulty: Difficulty.Medium,
    link: "https://leetcode.com/problems/fibonacci-number/",
  },
];
