import { Request } from "koa";

export class UploadJsonFileRequest {
    file: any;
    constructor(request: Request) {
        this.file = request.files.file;
    }
}