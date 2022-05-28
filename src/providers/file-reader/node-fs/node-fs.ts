import * as fs from "fs";
import { LoggerInterface } from "../../logger";
import { FileReadRequestModel, FileReadResponseModel } from "../read";
import { FileReaderInterface } from "../reader";

export class NodeFsReader implements FileReaderInterface {
    constructor(private readonly logger: LoggerInterface) { }

    async read(model: FileReadRequestModel): Promise<FileReadResponseModel> {
        try {
            return {
                fileContent: fs.readFileSync(model.filepath, 'utf-8')
            } as FileReadResponseModel;
        } catch (error) {
            this.logger.err(`Error in reading file ${error}`);
            throw error;
        }
    }
}