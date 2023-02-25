import joi from 'joi'
// import { getDepartment } from '../controller/departments'
// console.log(getDepartment)
// export const ref = joi.ref()
export const registerUserSchema = joi.object({
  email: joi.string().email().lowercase().required(),
  fullName: joi.string().min(3).required(),
  password: joi.string().min(3).required(),
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
