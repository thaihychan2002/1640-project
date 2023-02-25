import express from 'express'
import {
  getPosts,
  createPosts,
  updatePosts,
  deletePosts,
} from '../controller/posts.js'
import { isAuth, isAdmin } from '../utils.js'
const router = express.Router()

router.get('/', isAuth, getPosts)
router.post('/create',isAuth, createPosts)
router.put('/update', isAuth, updatePosts)
router.delete('/delete/:id',isAuth, deletePosts)

export default router
