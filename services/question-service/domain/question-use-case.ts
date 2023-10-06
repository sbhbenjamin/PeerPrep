import * as questionRepo from '../data-access/question-repository';
import { QuestionRecord, QuestionRequest } from '../types';
import { AddQuestionSchema, UpdateQuestionSchema } from './question-schema'; // Import your schemas here
import { assertQuestionExistsById, assertQuestionExistsByTitle, assertQuestionNotExistsByTitle } from './question-validator';

export async function getAllQuestions() {
  const response = await questionRepo.getAllQuestions();
  return response;
}

export async function addQuestion(newQuestion: QuestionRequest) {
  await assertQuestionNotExistsByTitle(newQuestion.title)
  const validatedData = AddQuestionSchema.parse(newQuestion);
  const response = await questionRepo.addNewQuestion(validatedData);
  return response;
}

export async function deleteQuestion(questionId: string) {
  await assertQuestionExistsById(questionId)
  return await questionRepo.deleteQuestion(questionId);
}

export async function getQuestionById(questionId: string) {
  await assertQuestionExistsById(questionId)
  return await questionRepo.getQuestionById(questionId);
}

export async function getQuestionByTitle(title: string) {
  await assertQuestionExistsByTitle(title)
  return await questionRepo.getQuestionByTitle(title);
}

export async function updateQuestion(questionId: string, updateQuestionRequest: Partial<QuestionRequest>) {
  await assertQuestionExistsById(questionId);
  const validatedData = UpdateQuestionSchema.parse(updateQuestionRequest);
  return await questionRepo.updateQuestion(questionId, validatedData);
}
