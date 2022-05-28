export interface LoggerInterface {
    log(message: string): Promise<void>;
    warn(message: string): Promise<void>;
    err(message: string): Promise<void>;
    info(message: string): Promise<void>;
}