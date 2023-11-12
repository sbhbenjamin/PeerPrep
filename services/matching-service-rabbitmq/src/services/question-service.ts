import pino from "pino";

export const getQuestion = async (
  params: URLSearchParams,
): Promise<Response> => {
  const logger = pino();
  try {
    logger.info(`GET /question/?${params.toString()}`);
    const res = await fetch(
      `http://question-service:5001/question/?${params.toString()}`,
    );

    return res;
  } catch (error) {
    logger.error("Error fetching question from question repo", error.message);
    throw error;
  }
};

export const getQuestionById = async (
  questionId: string,
): Promise<Response> => {
  const logger = pino();
  try {
    logger.info(`GET /question/${questionId}`);
    const res = await fetch(
      `http://question-service:5001/question/${questionId}`,
    );

    return res;
  } catch (error) {
    logger.error("Error fetching question from question repo", error.message);
    throw error;
  }
};
