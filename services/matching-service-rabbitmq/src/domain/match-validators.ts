import pino from "pino";

import { getQuestion } from "../services/question-service";

const logger = pino();

export const assertQuestionExists = async (
  difficulty: string,
  category: string,
): Promise<void> => {
  const params = new URLSearchParams({
    difficulty,
    category,
    getOne: "true",
  });

  try {
    await getQuestion(params);
    logger.debug(
      `Successfully fetched question for difficulty: ${difficulty}, category: ${category}`,
    );
  } catch (error) {
    logger.error(`Failed assertion: ${error.message}`);
    throw error;
  }
};

export const assertNotAlreadyInQueue = (
  socket: string,
  otherSocket: string,
): boolean => {
  const notInQueue = socket !== otherSocket;
  if (!notInQueue) {
    logger.warn(`Socket ${socket} is already in the queue.`);
  }
  return notInQueue;
};
