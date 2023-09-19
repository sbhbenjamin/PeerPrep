import util from 'util';
import express from 'express';
import { logger } from '@practica/logger';
import * as userUseCase from '../../domain/user-use-case';

export default function defineRoutes(expressApp: express.Application) {
  const router = express.Router();

  router.post('/', async (req, res, next) => {
    try {
      logger.info(
        `User API was called to add new User ${util.inspect(req.body)}`
      );
      // ✅ Best Practice: Using the 3-tier architecture, routes/controller are kept thin, logic is encapsulated in a dedicated domain folder
      const addUserResponse = await userUseCase.addUser(req.body);
      return res.json(addUserResponse);
    } catch (error) {
      next(error);
      return undefined;
    }
  });

  // get existing user by id
  router.get('/:id', async (req, res, next) => {
    try {
      logger.info(`User API was called to get user by id ${req.params.id}`);
      const response = await userUseCase.getUser(parseInt(req.params.id, 10));

      if (!response) {
        res.status(404).end();
        return;
      }

      res.json(response);
    } catch (error) {
      next(error);
    }
  });

  // update user by id
  router.put('/:id', async (req, res, next) => {
    try {
      logger.info(`User API was called to update user ${req.params.id}`);
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
  router.delete('/:id', async (req, res) => {
    logger.info(`User API was called to delete user ${req.params.id}`);
    await userUseCase.deleteUser(parseInt(req.params.id, 10));
    res.status(204).end();
  });

  expressApp.use('/user', router);
}
