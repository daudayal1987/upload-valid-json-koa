import { Request } from "koa";
import { UploadJsonFileRequest } from "../../../src/actions/upload-json-file/upload-json-file-request";

describe("Upload json file request test", () => {
    it("Should have correct values", async () => {
        const request: Request = {
            files: {
                file: "file-value"
            }
        } as unknown as Request;
        const reqObj = new UploadJsonFileRequest(request);
        expect(reqObj.file).toBe("file-value")
    })
})