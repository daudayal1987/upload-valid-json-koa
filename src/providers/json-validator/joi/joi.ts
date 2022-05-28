import * as joi from "joi";
import { LoggerInterface } from "../../logger";
import { JsonValidatorRequestModel, JsonValidatorResponseModel } from "../validate";
import { JsonValidatorInterface } from "../validator";

export class JoiValidator implements JsonValidatorInterface {
    constructor(private readonly logger: LoggerInterface) { }

    async validate(model: JsonValidatorRequestModel): Promise<JsonValidatorResponseModel> {
        try{
            await model.schema.validateAsync(model.json);
            return {
                valid: true
            } as JsonValidatorResponseModel;
        }catch(error){
            this.logger.err(`Error in validating json using joi ${error}`);
            throw error;
        }
    }
}