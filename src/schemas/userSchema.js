import joi from "joi";

export const register = joi.object({
  name: joi.string().empty().required(),
  email: joi.string().empty().email().required(),
  password: joi.string().empty().required(),
  confirmPassword: joi.string().valid(joi.ref("password")).required(),
});

export const logIn = joi.object({
  email: joi.string().email().empty().required(),
  password: joi.string().empty().required(),
});
