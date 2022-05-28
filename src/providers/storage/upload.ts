import { File } from "./file";

export interface UploadRequestModel{
    storageName: string;
    fileKey: string;
    file: any
}

export interface UploadedResponseModel {
    path: string;
}