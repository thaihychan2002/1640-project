import express from 'express'
import { getPosts, createPosts, updatePosts } from '../controller/posts.js'
import { isAuth, isAdmin } from '../utils.js'
const router = express.Router()

router.get('/', isAuth, getPosts)
router.post('/create', createPosts)
router.post('/update', isAuth, updatePosts)

export default router
