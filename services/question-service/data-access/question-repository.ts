import { getPrismaClient } from './prisma-client-factory';
import { QuestionFilter, QuestionRecord, QuestionRequest } from '../types';


export async function addNewQuestion(newQuestionRecordRequest: QuestionRequest): Promise<QuestionRecord> {
  return await getPrismaClient().question.create({
    data: newQuestionRecordRequest,
  })
}

export async function getQuestions(filter: Partial<QuestionFilter>): Promise<QuestionRecord[] | null> {
  // hasSome cannot take in undefined :(
  if (filter.categories) {
    return await getPrismaClient().question.findMany({
      where: {
        id: filter.id,
        title: filter.title,
        difficulty: filter.difficulty,
        category: {
          hasSome: filter.categories
        }
      }
    })
  } else {
    return await getPrismaClient().question.findMany({
      where: {
        id: filter.id,
        title: filter.title,
        difficulty: filter.difficulty,
      }
    })
  }
}

export async function updateQuestion(id: string, updateUserRequest: Partial<QuestionRequest>): Promise<QuestionRecord> {
  return await getPrismaClient().question.update({
    where: { id },
    data: updateUserRequest,
  })
}

export async function deleteQuestion(id: string): Promise<QuestionRecord> {
  return await getPrismaClient().question.delete({
    where: {
      id: id,
    },
  })
}
