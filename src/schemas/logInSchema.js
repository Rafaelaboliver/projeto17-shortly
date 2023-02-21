import joi from "joi";

export const logInSchema = joi.object({
  email: joi.string().email().empty().required(),
  password: joi.string().empty().required(),
});