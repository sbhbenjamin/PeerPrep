import express from 'express';
import * as questionUseCase from '../../domain/question-use-case';
import { validateAddQuestionInput, validateUpdateQuestionInput } from './validators';

export default function defineRoutes(expressApp: express.Application) {
  const router = express.Router();

  router.put('/',validateAddQuestionInput ,async (req, res, next) => {
    try {
      const addQuestionResponse = await questionUseCase.addQuestion(req.body);
      return res.json(addQuestionResponse);
    } catch (error) {
      next(error);
    }
  });

  router.get('/', async (_, res, next) => {
    try {
      const response = await questionUseCase.getAllQuestions();
      res.json(response);
    } catch (error) {
      next(error);
    }
  })

  router.get('/id/:id', async (req, res, next) => {
    try {
      const response = await questionUseCase.getQuestionById(req.params.id);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  });

  router.get('/title/:title', async (req, res, next) => {
    try {
      const response = await questionUseCase.getQuestionByTitle(req.params.title);
      res.status(202).json(response);
    } catch (error) {
      next(error)
    }
  });

  router.patch('/id/:id', validateUpdateQuestionInput, async (req, res, next) => {
    try {
      const response = await questionUseCase.updateQuestion(req.params.id, req.body);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  });

  router.delete('/id/:id', async (req, res, next) => {
    try {
      await questionUseCase.deleteQuestion(req.params.id);
      res.status(200).end();
    } catch (error) {
      next(error);
    }
  });

  expressApp.use('/question', router);
}
