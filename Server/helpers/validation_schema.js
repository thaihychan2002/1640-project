import joi from "joi";

export const registerUserSchema = joi.object({
  email: joi.string().email().lowercase().required(),
  fullName: joi.string().min(3).required(),
  password: joi.string().min(3).required(),
});
