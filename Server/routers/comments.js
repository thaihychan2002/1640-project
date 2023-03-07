import express from 'express'
import {
  deleteComment,
  createComment,
  getComment,
  updateComment,
  viewCmtByMostLikes,
  viewRecentlyCmt
} from '../controller/Comments.js'
import { isAuth, isAdmin } from '../utils.js'

const router = express.Router()
router.post('/', isAuth, getComment)
router.post('/create', isAuth, createComment)
router.delete('/delete/:id', isAuth, deleteComment)
router.put('/update', isAuth, updateComment)
// view comments
router.get('/viewCommentsByMostLikes', viewCmtByMostLikes)
router.get('/viewRecentlyComments', viewRecentlyCmt)
export default router