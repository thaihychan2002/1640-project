import express from 'express'
import {
  deleteDepartment,
  createDepartment,
  getDepartment,
  updateDepartment
} from '../controller/departments.js'
import { isAuth, isAdmin } from '../utils.js'

const router = express.Router()
router.get('/', isAuth, getDepartment)
router.post('/create', isAdmin, createDepartment)
router.post('/delete/:id', deleteDepartment)
router.post('/update',isAdmin,updateDepartment)

export default router
