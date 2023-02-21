import express from 'express'
import {
  getCate,
  createCate,
  deleteCate,
  updateCate
} from '../controller/categories.js'
import { isAuth, isAdmin } from '../utils.js'

const router = express.Router()
router.get('/', isAuth, getCate)
router.post('/create', isAdmin, createCate)
router.post('/delete/:id', isAdmin, deleteCate)
router.post('/update', isAdmin, updateCate)
export default router