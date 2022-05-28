import 'dotenv/config';
import Koa from "koa";
import Router from "koa-router";
import logger from "koa-logger";
import json from "koa-json";
const app = new Koa();

//TODO - implement swagger
//create action routes
import actions from "./apigateway";
const router = new Router();
router.use("/", actions);

//bind middlewares to app
app.use(json());
app.use(logger());
app.use((ctx, next) => {
  const corrId = ctx.header['x-request-id'] || Date.now().toString();
  ctx.set('x-request-id', corrId);
  ctx.state['x-request-id'] = corrId;
  return next();
});
app.use(actions);

app.listen(3000, () => {
  console.log("Koa started");
});