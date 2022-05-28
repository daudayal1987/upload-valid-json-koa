const DEFAULT_HEADERS = {
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE,PATCH",
    "X-Robots-Tag": "noindex"
}

interface Headers {
    [key: string]: string;
}

export interface ResponseInterface {
    status: number;
    body: {
        [key: string]: string
    };
    headers:
    Headers;
}

export interface ResponseEvent {
    status: number;
    body: object;
    headers?: any,
}

export class ResponseModel {
    status: number;
    body: any
}

export class ServiceResponse {

    status: number;
    headers: Headers;
    body: string;

    constructor(event: ResponseEvent) {

        this.status = event.status;

        // Add headers
        if (event.headers) {
            this.headers = { ...DEFAULT_HEADERS, ...event.headers }
        } else {
            this.headers = DEFAULT_HEADERS;
        }

        this.body = JSON.stringify(event.body);
    }
}