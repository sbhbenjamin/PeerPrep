import express from "express";

import * as questionUseCase from "../../domain/question-use-case";

import {
  validateAddQuestionInput,
  validateGetQuestionRequest,
  validateUpdateQuestionInput,
} from "./validators";

export default function defineRoutes(expressApp: express.Application) {
  const router = express.Router();

  router.post("/", validateAddQuestionInput, async (req, res, next) => {
    try {
      const addQuestionResponse = await questionUseCase.addQuestion(req.body);
      res.json(addQuestionResponse);
    } catch (error) {
      next(error);
    }
  });

  router.get("/", validateGetQuestionRequest, async (req, res, next) => {
    try {
      const response = await questionUseCase.getQuestions({
        id: req.query.id as string,
        title: req.query.title as string,
        difficulty: req.query.difficulty as string,
        categories: req.query.categories as string[],
      });
      res.json(response);
    } catch (error) {
      next(error);
    }
  });

  router.patch("/:id", validateUpdateQuestionInput, async (req, res, next) => {
    try {
      const response = await questionUseCase.updateQuestion(
        req.params.id,
        req.body,
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  });

  router.delete("/:id", async (req, res, next) => {
    try {
      await questionUseCase.deleteQuestion(req.params.id);
      res.status(200).end();
    } catch (error) {
      next(error);
    }
  });

  expressApp.use("/question", router);
}
