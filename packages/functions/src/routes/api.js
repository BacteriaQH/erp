import Router from 'koa-router';
import * as sampleController from '@functions/controllers/sampleController';
import * as userController from '@functions/controllers/userController';
import {upload} from '@functions/middleware/uploadMiddleware';

export default function apiRouter() {
  const router = new Router({prefix: '/api'});

  router.get('/sample', sampleController.exampleAction);
  router.post('/user/check', userController.checkUserController);
  router.get('/users', userController.getUsersController);
  router.delete('/user', userController.deleteUserController);
  router.put('/user', userController.updateUserController);
  router.post('/user', userController.createUserController);

  router.post('/upload', upload.single('file'), userController.uploadUserController);
  return router;
}
