import joi from "joi";

export const urlGiven = joi.object({
    url: joi.string().uri().empty().min(10).required(),
})