import express from 'express'
import {
  deleteSubcomment,
  createSubcomment,
  getSubcomment,
  updateSubcomment,
} from '../controller/subcomments.js'
import { isAuth, isAdmin } from '../utils.js'

const router = express.Router()
router.post('/', isAuth, getSubcomment)
router.post('/create', isAuth, createSubcomment)
router.delete('/delete/:id', isAuth, deleteSubcomment)
router.put('/update', isAuth, updateSubcomment)

export default router