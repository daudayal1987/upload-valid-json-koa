import { UploadRequestModel, UploadedResponseModel } from "./upload";

export interface StorageInterface {
  upload: (model: UploadRequestModel) => Promise<UploadedResponseModel>;
}