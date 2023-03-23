import {
  createCategorySchema,
  updateCategorySchema,
} from '../helpers/validation_schema.js'
import { CategoryModel } from '../model/category.js'
export const getCategory = async (req, res) => {
  try {
    const category = await CategoryModel.find()
    res.status(200).json(category)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

export const createCategory = async (req, res, next) => {
  try {
    await createCategorySchema.validateAsync(req.body)
    const newCategory = req.body
    const category = new CategoryModel(newCategory)
    await category.save()
    res.status(200).json(category)
  } catch (err) {
    if (err.isJoi === true) {
      res.status(422).send({ message: `${err.details[0].message}` })
    }
    next(err)
  }
}
export const deleteCategory = async (req, res) => {
  try {
    const deleteCategory = req.params.id
    const category = await CategoryModel.findByIdAndDelete(deleteCategory, {
      new: true,
    })
    res.status(200).json(category)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
export const updateCategory = async (req, res, next) => {
  try {
    await updateCategorySchema.validateAsync(req.body)
    const updateCategory = req.body
    const category = await CategoryModel.findByIdAndUpdate(
      { _id: updateCategory._id },
      updateCategory,
      { new: true }
    )
    res.status(200).json(category)
  } catch (err) {
    if (err.isJoi === true) {
      res.status(422).send({ message: `${err.details[0].message}` })
    }
    next(err)
  }
}
