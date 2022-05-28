import Router from "koa-router";
import { body as fileHandler } from "./middlewares/file-handler";
import { handler as uploadHandler } from "./actions/upload-json-file/handler";

const router = new Router();

router.post("/upload-user-file", fileHandler, uploadHandler);

export default new Router().use(router.routes(), router.allowedMethods()).routes();