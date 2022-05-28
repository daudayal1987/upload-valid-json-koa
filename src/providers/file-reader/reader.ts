import { FileReadRequestModel, FileReadResponseModel } from "./read";

export interface FileReaderInterface{
    read(model: FileReadRequestModel): Promise<FileReadResponseModel>;
}