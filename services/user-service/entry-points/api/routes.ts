import express from 'express';
import * as userUseCase from '../../domain/user-use-case';
import { validateAddUserInput, validateUpdateUserInput } from './validators';
import { err } from 'pino-std-serializers';

export default function defineRoutes(expressApp: express.Application) {
  const router = express.Router();

  router.post('/createUser',validateAddUserInput ,async (req, res, next) => {
    try {
      // ✅ Best Practice: Using the 3-tier architecture, routes/controller are kept thin, logic is encapsulated in a dedicated domain folder
      const addUserResponse = await userUseCase.addUser(req.body);
      return res.json(addUserResponse);
    } catch (error) {
      next(error);
      res.json(error);
    }
  });

  router.get('/getUsers', async (req, res, next) => {
    try {
      const response = await userUseCase.getAllUser();
      res.json(response);
    } catch (error) {
      next(error);
      res.json(error);
    }
  })

  // get existing user by id
  router.get('/id/:id', async (req, res, next) => {
    try {
      const response = await userUseCase.getUserById(parseInt(req.params.id, 10));
      if (!response) {
        res.status(404).end();
        return;
      }
      res.json(response);
    } catch (error) {
      next(error);
      res.json(error);
    }
  });

  router.get('/email/:email', async (req, res, next) => {
    try {
      const response = await userUseCase.getUserByMail(req.params.email);
      if (!response) {
        res.status(404).end();
        return;
      }
      res.json(response);
    } catch (error) {
      next(error);
      res.json(error);
    }
  });

  // update user by id
  router.put('/:id', validateUpdateUserInput, async (req, res, next) => {
    try {
      const response = await userUseCase.updateUser(parseInt(req.params.id, 10), req.body);
      if (!response) {
        res.status(404).end();
        return;
      }
      res.json(response);
    } catch (error) {
      next(error);
      res.json(error);
    }
  });

  // delete user by id
  router.delete('/:id', async (req, res) => {
    try {
      await userUseCase.deleteUser(parseInt(req.params.id, 10));
      res.status(204).end();
    } catch (error) {
      res.status(404)
    }
  });

  expressApp.use('/user', router);
}
