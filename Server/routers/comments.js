import express from 'express'
import {
  deleteComment,
  createComment,
  getComment,
  updateComment,
} from '../controller/Comments.js'
import { isAuth, isAdmin } from '../utils.js'

const router = express.Router()
router.get('/', isAuth, getComment)
router.post('/create', isAuth, createComment)
router.delete('/delete/:id', isAuth, deleteComment)
router.put('/update', isAuth, updateComment)

export default router