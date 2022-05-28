import { Request } from "koa";
import { ConsoleLogger } from "../../../src/providers/logger/console";
import { LocalStore } from "../../../src/providers/storage/local";
import { NodeFsReader } from "../../../src/providers/file-reader/node-fs";
import { JoiValidator } from "../../../src/providers/json-validator/joi";
import { UploadJsonFileService } from "../../../src/actions/upload-json-file/upload-json-file-service";
import { UploadJsonFileRequest } from "../../../src/actions/upload-json-file/upload-json-file-request";

describe("Upload json file service test", () => {
    const consoleLogger: ConsoleLogger = new ConsoleLogger("request-url", "request-method", "request-id");
    const localStore: LocalStore = new LocalStore(consoleLogger);
    const nodeFsReader: NodeFsReader = new NodeFsReader(consoleLogger);
    const joiValidator: JoiValidator = new JoiValidator(consoleLogger);
    const service: UploadJsonFileService = new UploadJsonFileService(consoleLogger, localStore, nodeFsReader, joiValidator, "userJsonSchema");

    it("should be success", async () => {
        const request: Request = {
            files: {
                file: {
                    mimetype: "application/json",
                    originalFilename: "file.name.ext"
                }
            }
        } as unknown as Request;

        LocalStore.prototype.upload = jest.fn().mockResolvedValueOnce({ path: "filepath" })
        NodeFsReader.prototype.read = jest.fn().mockResolvedValueOnce({ fileContent: JSON.stringify({ "user": "user", "amount": 10 }) })
        JoiValidator.prototype.validate = jest.fn().mockResolvedValueOnce(true);
        const response = await service.upload(new UploadJsonFileRequest(request));
        expect(response).toMatchObject({
            status: 200,
            body: JSON.stringify({
                message: "success",
                filepath: "filepath"
            })
        });
    });

    it("should return error: UnknownFile", async () => {
        const request: Request = {
            files: {
                file: {
                    mimetype: "invalid",
                    originalFilename: "file.name.ext"
                }
            }
        } as unknown as Request;

        const response = await service.upload(new UploadJsonFileRequest(request));
        expect(response).toMatchObject({
            status: 400,
            body: JSON.stringify({
                message: "UnknownFile"
            })
        })
    });
})