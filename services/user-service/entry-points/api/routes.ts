import express from 'express';
import * as userUseCase from '../../domain/user-use-case';
import { validateAddUserInput, validateUpdateUserInput } from './validators';

export default function defineRoutes(expressApp: express.Application) {
  const router = express.Router();

  router.post('/',validateAddUserInput ,async (req, res, next) => {
    try {
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
    }
  });

  // delete user by id
  router.delete('/:id', async (req, res) => {
    await userUseCase.deleteUser(parseInt(req.params.id, 10));
    res.status(204).end();
  });

  expressApp.use('/user', router);
}
