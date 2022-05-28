import { FileReaderInterface } from "../../providers/file-reader";
import { FileReadResponseModel } from "../../providers/file-reader/read";
import { JsonValidatorInterface } from "../../providers/json-validator";
import { LoggerInterface } from "../../providers/logger";
import { StorageInterface } from "../../providers/storage";
import { UploadRequestModel, UploadedResponseModel } from "../../providers/storage/upload";
import { UploadJsonFileRequest } from "./upload-json-file-request";
import { UploadJsonFileResponse } from "./upload-json-file-response";

interface UploadJsonFileServiceInterface {
    upload(request: UploadJsonFileRequest): Promise<UploadJsonFileResponse>;
}

export class UploadJsonFileService implements UploadJsonFileServiceInterface {
    constructor(
        private readonly logger: LoggerInterface,
        private readonly storage: StorageInterface,
        private readonly fileReader: FileReaderInterface,
        private readonly jsonValidator: JsonValidatorInterface,
        private readonly jsonSchema: any
    ) { }

    async upload(request: UploadJsonFileRequest): Promise<UploadJsonFileResponse> {
        try {
            this.validateRequest(request);

            const uploadRequestModel: UploadRequestModel = {
                storageName: process.cwd(),
                fileKey: `${process.env.UPLOAD_PATH}/${Date.now()}.${request.file.originalFilename.split(".").splice(-1)}`,
                file: request.file
            }
            const uploadResponseModel: UploadedResponseModel = await this.storage.upload(uploadRequestModel);

            const fileReaderResponseModel: FileReadResponseModel = await this.fileReader.read({
                filepath: uploadResponseModel.path
            });

            const fileJson: Record<string, any>[] = JSON.parse(fileReaderResponseModel.fileContent);
            await this.jsonValidator.validate({
                json: fileJson,
                schema: this.jsonSchema
            });

            return new UploadJsonFileResponse({
                status: 200,
                body: {
                    message: "success",
                    filepath: uploadResponseModel.path
                }
            })
        } catch (error) {
            this.logger.err(`Error in uploading file ${error}`);
            return new UploadJsonFileResponse({
                status: 400,
                body: {
                    message: error
                }
            })
        }
    }

    private validateRequest(request: UploadJsonFileRequest) {
        try {
            if (request.file.mimetype != "application/json") {
                throw "UnknownFile";
            }
        } catch (error) {
            this.logger.err(`Error in validating request ${error}`);
            throw error;
        }
    }
}