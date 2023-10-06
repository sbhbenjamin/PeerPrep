import { getPrismaClient } from './prisma-client-factory';
import { QuestionRecord, QuestionRequest } from '../types';


export async function addNewQuestion(newQuestionRecordRequest: QuestionRequest): Promise<QuestionRecord> {
  const question = await getPrismaClient().question.create({
    data: newQuestionRecordRequest,
  });
  return question;
}

export async function getAllQuestions(): Promise<QuestionRecord[] | null> {
  const questions = await getPrismaClient().question.findMany({
  })
  return questions;
}

export async function getQuestionById(id: string): Promise<QuestionRecord | null> {
  const question = await getPrismaClient().question.findUnique({
    where: {
      id,
    },
  });
  return question;
}

export async function getQuestionByTitle(title: string): Promise<QuestionRecord | null> {
  const question = await getPrismaClient().question.findUnique({
    where: {
      title: title
    }
  })
  return question;
}

export async function getQuestionsByDifficulty(difficulty: string): Promise<QuestionRecord[] | null> {
  const questions = await getPrismaClient().question.findMany({
    where: {
      difficulty: difficulty
    }
  })
  return questions;
}


export async function updateQuestion(id: string, updateUserRequest: Partial<QuestionRequest>): Promise<QuestionRecord> {
  const resultQuestion = await getPrismaClient().question.update({
    where: { id },
    data: { ...updateUserRequest },
  });

  return resultQuestion;
}

export async function deleteQuestion(id: string): Promise<QuestionRecord> {
  const deleteResult = await getPrismaClient().question.delete({
    where: {
      id: id,
    },
  });
  return deleteResult;
}
