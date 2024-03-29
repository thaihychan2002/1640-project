import express from 'express'
import {
  deleteDepartment,
  createDepartment,
  getDepartment,
  updateDepartment,
} from '../controller/departments.js'
import { isAuth, isAdmin } from '../utils.js'

const router = express.Router()
router.get('/', getDepartment)
router.post('/create', isAdmin, createDepartment)
router.delete('/delete/:id', isAdmin, deleteDepartment)
router.put('/update', isAdmin, updateDepartment)

export default router
