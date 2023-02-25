import express from 'express'
import {
  getCate,
  createCate,
  deleteCate,
  updateCate,
} from '../controller/categories.js'
import { isAuth, isAdmin } from '../utils.js'

const router = express.Router()
router.get('/', isAuth, getCate)
router.post('/create', isAdmin, createCate)
<<<<<<< HEAD
router.delete('/delete/:id',isAdmin, deleteCate)
=======
router.delete('/delete/:id', isAdmin, deleteCate)
>>>>>>> c8c199e155fdd253558a7cd53153a5f6e045abfd
router.put('/update', isAdmin, updateCate)
export default router
