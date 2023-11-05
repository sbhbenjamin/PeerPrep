import pino from "pino";

export const getQuestion = async (
  params: URLSearchParams,
): Promise<Response> => {
  const logger = pino();
  try {
    logger.info("Getting question from questions repository...");
    const res = await fetch(
      `http://question-service:5001/question/?${params.toString()}`,
    );

    return res;
  } catch (error) {
    logger.error("Error fetching question from question repo", error.message);
    throw error;
  }
};
