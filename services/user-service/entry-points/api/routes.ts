import express from 'express';
import * as userUseCase from '../../domain/user-use-case';
import { validateAddUserInput, validateUpdateUserInput } from './validators';
import { err } from 'pino-std-serializers';

export default function defineRoutes(expressApp: express.Application) {
  const router = express.Router();

  router.post('/',validateAddUserInput ,async (req, res, next) => {
    try {
      // ✅ Best Practice: Using the 3-tier architecture, routes/controller are kept thin, logic is encapsulated in a dedicated domain folder
      const addUserResponse = await userUseCase.addUser(req.body);
      return res.json(addUserResponse);
    } catch (error) {
      next(error);
    }
  });

  router.get('/', async (req, res, next) => {
    try {
      const response = await userUseCase.getAllUser();
      res.json(response);
    } catch (error) {
      next(error);
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
    }
  });

  router.get('/email/:email', async (req, res, next) => {
    try {
      const response = await userUseCase.getUserByMail(req.params.email);
      res.json(response);
    } catch (error) {
      next(error)
    }
  });

  // update user by id
  router.put('id/:id', validateUpdateUserInput, async (req, res, next) => {
    try {
      const response = await userUseCase.updateUser(parseInt(req.params.id, 10), req.body);
      if (!response) {
        res.status(404).end();
        return;
      }
      res.json(response);
    } catch (error) {
      next(error);
    }
  });

  // delete user by id
  router.delete('/id/:id', async (req, res, next) => {
    try {
      await userUseCase.deleteUser(parseInt(req.params.id, 10));
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  });

  expressApp.use('/user', router);
}
