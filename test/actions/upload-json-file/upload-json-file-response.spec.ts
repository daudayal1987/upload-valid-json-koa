import { UploadJsonFileResponse } from "../../../src/actions/upload-json-file/upload-json-file-response";
import { ResponseEvent } from "../../../src/models/response-model";

describe("Upload json file response test", () => {
    const inputEvent: ResponseEvent = {
        status: 200,
        body: {
            message: "success"
        }
    }
    it("Should have specified values", async () => {
        const response: UploadJsonFileResponse = new UploadJsonFileResponse(inputEvent);
        expect(response.status).toBe(200);
        expect(response.body).toBe(JSON.stringify({ message: "success" }));
        expect(response.headers).toMatchObject({
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE,PATCH',
            'X-Robots-Tag': 'noindex'
        });
    });
    
    it("Should have specified values", async () => {
        inputEvent.headers = { 'a': 'b' }
        const response: UploadJsonFileResponse = new UploadJsonFileResponse(inputEvent);
        expect(response.status).toBe(200);
        expect(response.body).toBe(JSON.stringify({ message: "success" }));
        expect(response.headers).toMatchObject({
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE,PATCH',
            'X-Robots-Tag': 'noindex',
            'a': 'b'
        });
    })
})