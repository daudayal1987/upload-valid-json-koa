import * as joi from "joi";

export const schema = joi.array().items(joi.object({
    user: joi.string(),
    amount: joi.number()
}));