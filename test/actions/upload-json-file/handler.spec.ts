import { Context } from "koa";
import { handler } from "../../../src/actions/upload-json-file/handler";
import { UploadJsonFileService } from "../../../src/actions/upload-json-file/upload-json-file-service";

describe("Upload json file handler test", () => {
    it("Should call service", async () => {
        const ctx: Context = {
            request: {
                URL: "URL",
                method: "method",
                files: {
                    file: "file"
                }
            },
            state: {
                "x-request-id": "request-id"
            }
        } as unknown as Context;
        UploadJsonFileService.prototype.upload = jest.fn().mockResolvedValueOnce({ status: "status", body: "body" })
        await handler(ctx, async () => { });
        expect(ctx.status).toBe("status");
        expect(ctx.body).toBe("body");
    });

    it("Should throw error", async () => {
        const ctx: Context = {
            request: {
                URL: "URL",
                method: "method",
                files: {
                    file: "file"
                }
            },
            state: {
                "x-request-id": "request-id"
            }
        } as unknown as Context;
        UploadJsonFileService.prototype.upload = jest.fn().mockRejectedValueOnce("some-error")
        try {
            await handler(ctx, async () => { });
        } catch (error) {
            expect(error).toBe("some-error");
        }
    });
})