import joi from 'joi'
import { DepartmentModel } from '../model/departments.js'

const getDepartments = async (req, res) => {
  const dpt = await DepartmentModel.find()
  const a = dpt.map((item) => item.name)
}

export const registerUserSchema = joi.object({
  email: joi.string().email().lowercase().required(),
  fullName: joi.string().min(3).required(),
  password: joi.string().min(3).required(),
})

export const postValidateSchema = joi.object({
  title: joi.string().required(),
  content: joi.string().required(),
  author: joi.string().required(),
  department: joi.valid(getDepartments(a)).required(),
  categories: joi.string().required(),
  likeCount: joi.string().required(),
})
