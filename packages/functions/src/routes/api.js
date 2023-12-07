import Router from 'koa-router';
import * as userController from '@functions/controllers/userController';
import {uploadMiddleware} from '@functions/middleware/uploadMiddleware';
import {validateMiddleware} from '@functions/middleware/validateMiddleware';

export default function apiRouter() {
  const router = new Router({prefix: '/api'});

  router.post('/user/check', userController.checkUserController);
  router.get('/users', userController.getUsersController);
  router.delete('/user', userController.deleteUserController);
  router.put('/user', validateMiddleware, userController.updateUserController);
  router.post('/user', validateMiddleware, userController.createUserController);

  router.put('/upload', uploadMiddleware, userController.uploadUserController);
  return router;
}
