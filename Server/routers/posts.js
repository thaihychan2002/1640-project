import express from 'express'
import {
  getPosts,
  createPosts,
  updatePosts,
  deletePosts,
  viewPostsByMostViews,
  viewRecentlyPosts,
  searchPostsByKeyword,
  viewPostsByDepartment,
  viewPostsByMostLikes,
} from '../controller/posts.js'
import { isAuth, isAdmin } from '../utils.js'
const router = express.Router()

router.get('/', isAuth, getPosts)
router.post('/create', isAuth, createPosts)
router.put('/update', isAuth, updatePosts)
router.delete('/delete/:id', isAuth, deletePosts)
// view posts
router.get('/viewPostsByMostViews', viewPostsByMostViews)
router.get('/viewPostsByMostLikes', viewPostsByMostLikes)
router.get('/viewRecentlyPosts', viewRecentlyPosts)
router.get('/viewPostsByDepartment/:department', viewPostsByDepartment)
//search posts
router.get('/search/:keyword', searchPostsByKeyword)

export default router
