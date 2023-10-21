// Initialize queues within matching-socketio service
import { Match, ids } from "../start";

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

export function isDuplicateID(id: number) {
    if (ids.includes(id)) {
        return true;
    } else {
        return false;
    }
}