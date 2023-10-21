import { queues } from "../start";


export function extractDifficulty(difficulty: string) {
    const DIFFICULTIES = [
        "easy",
        "medium",
        "hard"
    ]
    difficulty = difficulty.toLowerCase();
    if (DIFFICULTIES.includes(difficulty)) {
        return difficulty;
    } else {
        return undefined;
    }
}

export function extractCategory(category: string) {
    const CATEGORIES = [
        "strings",
        "algorithms",
        "datastructures",
        "bitmanipulation",
        "recursion",
        "databases",
        "brainteaser",
        "arrays"
    ]

    category = category.toLowerCase();
    if (CATEGORIES.includes(category)) {
        return category;
    } else {
        return undefined;
    }
}

export function checkIdExists(id: number) {
    const matches = Array.from(queues.entries());
    const res = matches.find((element) => element[1].id == id);
    return res != undefined;
}