import express from 'express'
import {
  createCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from '../controller/category.js'

import { isAuth, isAdmin } from '../utils.js'

const router = express.Router()
router.get('/', isAuth, getCategory)
router.post('/create', isAdmin, createCategory)
router.delete('/delete/:id', isAdmin, deleteCategory)
router.put('/update', isAdmin, updateCategory)

export default router
