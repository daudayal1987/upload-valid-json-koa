export interface JsonValidatorRequestModel{
    schema: any;
    json: Record<string, any> | Record<string, any>[]
}

export interface JsonValidatorResponseModel{
    valid: boolean;
    error?: string;
}