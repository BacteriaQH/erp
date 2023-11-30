import App from 'koa';
import createErrorHandler from '../middleware/errorHandler';
import router from '../routes/api';
import render from 'koa-ejs';
import path from 'path';
import {handleError} from '../services/errorService';
import bodyParser from '@koa/bodyparser';
// Initialize all demand configuration for an application
const api = new App();
api.proxy = true;
render(api, {
  cache: true,
  debug: false,
  layout: false,
  root: path.resolve(__dirname, '../../views'),
  viewExt: 'html'
});

function hybridBodyParser(opts) {
  const bp = bodyParser(opts);
  return async (ctx, next) => {
    ctx.request.body = ctx.request.body || ctx.req.body;
    return bp(ctx, next);
  };
}

api.use(hybridBodyParser());
api.use(createErrorHandler());

// Register all routes for the application
api.use(router().routes()).use(router().allowedMethods());

// Handling all errors
api.on('error', handleError);

export default api;
