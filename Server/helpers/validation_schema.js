import joi from 'joi'

export const registerUserSchema = joi.object({
  email: joi.string().email().lowercase().required(),
  fullName: joi.string().min(3).required(),
  password: joi.string().min(3).required(),
  roleUser: joi.string().required(),
})

export const postValidateSchema = joi.object({
  title: joi.string().required(),
  content: joi.string().required(),
  author: joi.string().required(),
  department: joi.string().required(),
  categories: joi.allow(),
  attachment: joi.allow(),
  // categories: joi.string(),
  // likeCount: joi.string(),
})
export const createCategorySchema = joi.object({
  name: joi.string().min(3).required(),
  description: joi.string().min(10).required(),
  begin: joi.date().greater('1-1-2023').less('12-31-2025').required(),
  end: joi.date().greater('1-1-2023').less('12-31-2025').required(),
})
