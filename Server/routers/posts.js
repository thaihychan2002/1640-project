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

router.get('/', isAuth, getPosts)
router.get('/idea/:slug', isAuth, getPostBySlug)
router.post('/create', isAuth, createPosts)
router.put('/update', isAuth, updatePosts)
router.put('/countView', isAuth, countViewPostBySlug)
router.delete('/delete/:id', isAuth, deletePosts)
router.delete('/deletePost/:id', isAdmin, deletePostByAdmin)
// view posts
router.get('/viewPostsByMostViews', isAuth, viewPostsByMostViews)
router.get('/viewPostsByMostLikes', isAuth, viewPostsByMostLikes)
router.get('/viewRecentlyPosts', isAuth, viewRecentlyPosts)
router.post('/viewPostsByDepartment/', isAuth, viewPostsByDepartment)
router.post('/viewPostsByCategory/', isAuth, viewPostsByCategories)
//search posts
router.get('/search/:keyword', isAuth, searchPostsByKeyword)
//post status
router.put('/accept', isAdmin, updatePostToAccepted)
router.put('/reject', isAdmin, updatePostToRejected)
//export posts
router.get('/export', isAdmin, exportPost)
router.post('/download', isAdmin, downloadPost)
export default router
