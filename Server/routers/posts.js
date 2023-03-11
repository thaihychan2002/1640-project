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
  updatePostToAccepted,
  updatePostToRejected,
  deletePostByAdmin,
  exportPost,
  downloadPost,
  getPostBySlug,
  viewPostsByCategories,
  countViewPostBySlug,
} from '../controller/posts.js'
import { isAuth, isAdmin } from '../utils.js'
const router = express.Router()

router.get('/', getPosts)
router.get('/idea/:slug', getPostBySlug)
router.post('/create', isAuth, createPosts)
router.put('/update', isAuth, updatePosts)
router.put('/countView', isAuth, countViewPostBySlug)
router.delete('/delete/:id', isAuth, deletePosts)
router.delete('/deletePost/:id', isAdmin, deletePostByAdmin)
// view posts
router.get('/viewPostsByMostViews', viewPostsByMostViews)
router.get('/viewPostsByMostLikes', viewPostsByMostLikes)
router.get('/viewRecentlyPosts', viewRecentlyPosts)
router.post('/viewPostsByDepartment/', viewPostsByDepartment)
router.post('/viewPostsByCategory/', viewPostsByCategories)
//search posts
router.get('/search/:keyword', searchPostsByKeyword)
//post status
router.put('/accept', updatePostToAccepted)
router.put('/reject', updatePostToRejected)
//export posts
router.get('/export', exportPost)
router.post('/download', downloadPost)
export default router
