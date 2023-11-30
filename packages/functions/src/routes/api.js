import Router from 'koa-router';
import * as sampleController from '@functions/controllers/sampleController';

export default function apiRouter() {
  const router = new Router({prefix: '/api'});

  router.get('/sample', sampleController.exampleAction);

  return router;
}
