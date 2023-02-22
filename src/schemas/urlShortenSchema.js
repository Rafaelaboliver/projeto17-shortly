import joi from "joi";

export const urlShorten = joi.object({
    url: joi.string().uri().empty().min(10).required(),
})