import {
    S3Client,
    PutObjectCommand,
    PutObjectCommandInput,
    PutObjectCommandOutput
} from "@aws-sdk/client-s3";
import { LoggerInterface } from "../../logger";
import { StorageInterface } from "../storage";
import { UploadRequestModel, UploadedResponseModel } from "../upload";

export class S3Provider implements StorageInterface {
    storageClient: S3Client;

    constructor(private readonly logger: LoggerInterface) {
        this.storageClient = new S3Client({
            region: process.env.AWS_REGION,
        });
    }

    async upload(model: UploadRequestModel): Promise<UploadedResponseModel> {
        try {
            const putCommandInput: PutObjectCommandInput = {
                Bucket: model.storageName,
                Key: model.fileKey,
                Body: model.file.content,
                ContentType: model.file.type
            }
            const putCommand: PutObjectCommand = new PutObjectCommand(putCommandInput);
            await this.storageClient.send(putCommand);

            return {
                path: `${model.storageName}/${model.fileKey}`
            } as UploadedResponseModel;
        } catch (error) {
            this.logger.err(`Error in uploading content ${error}`);
            throw error;
        }
    }
}