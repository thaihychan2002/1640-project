import joi from 'joi'
//users
export const registerUserSchema = joi.object({
  email: joi.string().email().lowercase().required(),
  fullName: joi.string().min(3).required(),
  password: joi.string().min(3).required(),
  roleUser: joi.string().required(),
})
export const updateUserSchema = joi.object({
  fullName: joi.string().min(3).allow(''),
  data: joi.string().allow(''),
  userID: joi.string().required(),
})
export const updateUserByAdminSchema = joi.object({
  userID: joi.string().required(),
  roleID: joi.string().required(),
})

//posts
export const createPostSchema = joi.object({
  title: joi.string().min(3).required(),
  content: joi.string().required(),
  author: joi.string().required(),
  department: joi.string().valid().required(),
  categories: joi.allow(),
  attachment: joi.allow(),
  isAnonymous: joi.boolean().required(),
  likeCount: joi.number().valid(0).allow(),
  view: joi.number().valid(0).allow(),
})
//categories
export const createCategorySchema = joi.object({
  name: joi.string().min(3).required(),
  description: joi.string().min(10).required(),
  begin: joi.date().greater('1-1-2023').less('12-31-2025').required(),
  end: joi.date().greater('1-1-2023').less('12-31-2025').required(),
})
export const updateCategorySchema = joi.object({
  _id: joi.string().required(),
  name: joi.string().min(3).required(),
  description: joi.string().min(10).required(),
  begin: joi.date().greater('1-1-2023').less('12-31-2025').required(),
  end: joi.date().greater('1-1-2023').less('12-31-2025').required(),
})
export const createRoleSchema = joi.object({
  name: joi.string().required(),
})
export const updateRoleSchema = joi.object({
  _id: joi.string().required(),
  name: joi.string().required(),
})
//departments
export const createDepartmentSchema = joi.object({
  name: joi.string().required(),
})
export const updateDepartmentSchema = joi.object({
  _id: joi.string().required(),
  name: joi.string().required(),
})
//comments
export const createCommentSchema = joi.object({
  content: joi.string().required(),
  author: joi.string().required(),
  postID: joi.string().required(),
})
