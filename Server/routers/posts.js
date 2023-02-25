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
<<<<<<< HEAD
router.post('/create',isAuth, createPosts)
router.put('/update', isAuth, updatePosts)
router.delete('/delete/:id',isAuth, deletePosts)
=======
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
>>>>>>> c8c199e155fdd253558a7cd53153a5f6e045abfd

export default router
