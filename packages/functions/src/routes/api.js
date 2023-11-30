import Router from 'koa-router';
import * as sampleController from '@functions/controllers/sampleController';
import * as userController from '@functions/controllers/userController';

export default function apiRouter() {
  const router = new Router({prefix: '/api'});

  router.get('/sample', sampleController.exampleAction);
  router.post('/user/check', userController.checkUserController);

  return router;
}
