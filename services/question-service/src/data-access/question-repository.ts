import type {
  QuestionFilter,
  QuestionRecord,
  QuestionRequest,
} from "../../types";

import { getPrismaClient } from "./prisma-client-factory";

export async function addNewQuestion(
  newQuestionRecordRequest: QuestionRequest,
): Promise<QuestionRecord> {
  return getPrismaClient().question.create({
    data: newQuestionRecordRequest,
  });
}

export async function getQuestions(
  filter: Partial<QuestionFilter>,
): Promise<QuestionRecord[] | null> {
  // hasSome cannot take in undefined :(
  if (filter.categories) {
    return getPrismaClient().question.findMany({
      where: {
        id: filter.id,
        title: filter.title,
        difficulty: filter.difficulty,
        categories: {
          hasSome: filter.categories,
        },
        isDeleted: filter.isDeleted,
      },
    });
  }
  return getPrismaClient().question.findMany({
    where: {
      id: filter.id,
      title: filter.title,
      difficulty: filter.difficulty,
      isDeleted: filter.isDeleted,
    },
  });
}

export async function getQuestionById(
  id: string,
): Promise<QuestionRecord | null> {
  const question = getPrismaClient().question.findUnique({
    where: {
      id,
    },
  });
  return question;
}

export async function updateQuestion(
  id: string,
  updateUserRequest: Partial<QuestionRequest>,
): Promise<QuestionRecord> {
  return getPrismaClient().question.update({
    where: { id, isDeleted: false },
    data: updateUserRequest,
  });
}

export async function deleteQuestion(id: string): Promise<QuestionRecord> {
  getPrismaClient().questionOfTheDay.updateMany({
    where: {
      questionId: id,
    },
    data: {
      isDeleted: true,
    },
  });

  return getPrismaClient().question.update({
    where: {
      id,
    },
    data: {
      isDeleted: true,
    },
  });
}

export async function getQuestionOfTheDay(date: Date) {
  return getPrismaClient().questionOfTheDay.findFirst({
    where: {
      date,
      isDeleted: false,
    },
  });
}

export async function addQuestionOfTheDay(date: Date, questionId: string) {
  return getPrismaClient().questionOfTheDay.create({
    data: {
      questionId,
      date,
    },
  });
}
