import { JsonValidatorRequestModel, JsonValidatorResponseModel } from "./validate";

export interface JsonValidatorInterface{
    validate(model: JsonValidatorRequestModel): Promise<JsonValidatorResponseModel>;
}