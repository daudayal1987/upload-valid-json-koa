import { ResponseEvent, ServiceResponse } from "../../models/response-model";

export class UploadJsonFileResponse extends ServiceResponse {
    constructor(response: ResponseEvent) {
        super(response)
    }
}