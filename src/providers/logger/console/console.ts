import { LoggerInterface } from "../logger";

export class ConsoleLogger implements LoggerInterface {
    constructor(private readonly actionName, private readonly method, private readonly requestId) { }

    private getMessage(message){
        return `[${this.actionName}] :: [${this.method}] :: [${this.requestId}] :: ${message}`;
    }

    async log(message: string): Promise<void> {
        console.log(this.getMessage(message));
    }

    async warn(message: string): Promise<void> {
        console.warn(this.getMessage(message));
    }

    async err(message: string): Promise<void> {
        console.error(this.getMessage(message));
    }

    async info(message: string): Promise<void> {
        console.info(this.getMessage(message));
    }
}