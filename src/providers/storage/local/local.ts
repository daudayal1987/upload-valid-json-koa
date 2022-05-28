import { createReadStream, createWriteStream, ReadStream, WriteStream } from "fs";
import * as path from "path";
import { resolve } from "path";
import { LoggerInterface } from "../../logger";
import { StorageInterface } from "../storage";
import { UploadRequestModel, UploadedResponseModel } from "../upload";

export class LocalStore implements StorageInterface {
    constructor(private readonly logger: LoggerInterface) { }

    async upload(model: UploadRequestModel): Promise<UploadedResponseModel> {
        return new Promise(async(resolve, reject)=>{
            try {
                const filePath: string = path.join(model.storageName, model.fileKey);
                const reader: ReadStream = createReadStream(model.file.filepath)
                const stream: WriteStream = createWriteStream(filePath);
                reader.pipe(stream);
                stream.on('finish', () => {
                    resolve({
                        path: filePath
                    } as UploadedResponseModel)
                });
                stream.on('error', () => {
                    reject("error in uploading local");
                })
            } catch (error) {
                this.logger.err(`Error in uploading to local ${error}`);
                reject(error);
            }
        });
    }
}