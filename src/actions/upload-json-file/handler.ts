import { Next, Context, Request, Response } from "koa";
import { JoiValidator } from "../../providers/json-validator/joi";
import { NodeFsReader } from "../../providers/file-reader/node-fs";
import { ConsoleLogger } from "../../providers/logger/console";
import { LocalStore } from "../../providers/storage/local";
import { schema as userJsonSchema } from "./user-json-schema";
import { UploadJsonFileRequest } from "./upload-json-file-request";
import { UploadJsonFileResponse } from "./upload-json-file-response";
import { UploadJsonFileService } from "./upload-json-file-service";

export const handler = async (ctx: Context, next: Next) => {
    const request: Request = ctx.request;
    const response: Response = ctx.response;

    const consoleLogger: ConsoleLogger = new ConsoleLogger(request.URL, request.method, ctx.state['x-request-id']);
    const localStore: LocalStore = new LocalStore(consoleLogger);
    const nodeFsReader: NodeFsReader = new NodeFsReader(consoleLogger);
    const joiValidator: JoiValidator = new JoiValidator(consoleLogger);
    const service: UploadJsonFileService = new UploadJsonFileService(consoleLogger, localStore, nodeFsReader, joiValidator, userJsonSchema);
    try {
        consoleLogger.log(`Initializing request`);
        const reqObj: UploadJsonFileRequest = new UploadJsonFileRequest(request);
        const resObj: UploadJsonFileResponse = await service.upload(reqObj);
        ctx.status = resObj.status;
        ctx.body = resObj.body;
    } catch (error) {
        consoleLogger.err(`Error in processing request: ${error}`);
        throw error;
    }
};