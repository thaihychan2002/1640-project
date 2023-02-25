import express from 'express'
import {
  deleteDepartment,
  createDepartment,
  getDepartment,
  updateDepartment,
} from '../controller/departments.js'
import { isAuth, isAdmin } from '../utils.js'

const router = express.Router()
router.get('/', isAuth, getDepartment)
router.post('/create', isAdmin, createDepartment)
<<<<<<< HEAD
router.delete('/delete/:id',isAdmin, deleteDepartment)
router.put('/update',isAdmin,updateDepartment)
=======
router.delete('/delete/:id', isAdmin, deleteDepartment)
router.put('/update', isAdmin, updateDepartment)
>>>>>>> c8c199e155fdd253558a7cd53153a5f6e045abfd

export default router
