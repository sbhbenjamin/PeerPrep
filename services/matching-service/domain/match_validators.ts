// Initialize queues within matching-socketio service
import { easy_queue, medium_queue, hard_queue, Match } from "../start";

export function defineQueue(difficulty: string) {
    if (difficulty.toLowerCase() == "easy") {
        return easy_queue;
    } else if (difficulty.toLowerCase() == "medium") {
        return medium_queue;
    } else if (difficulty.toLowerCase() == "hard") {
        return hard_queue;
    } else {
        return undefined;
    }
}

export function isDuplicateID(id: number) {
    if (easy_queue.find((match: Match) => match != undefined && match.id == id) || 
    medium_queue.find((match: Match) => match != undefined && match.id == id) || 
    hard_queue.find((match: Match) => match != undefined && match.id == id)) {
        return true;
    }
    return false;
}