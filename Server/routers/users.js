import express from 'express'
import {
  getUsers,
  getUserById,
  loginUsers,
  loginGoogleUsers,
  registerUsers,
  registerGoogleUsers,
  deleteUser,
  updateUser,
  updateUserProfile,
  refresh,
  logout,
  updatePassword,
  forgotPassword,
  resetPassword,
} from '../controller/users.js'
import { isAuth, isAdmin } from '../utils.js'
const router = express.Router()

router.get('/', getUsers)
router.get('/refresh', refresh)
router.post('/getUserByID/', isAuth, getUserById)
router.post('/logout', logout)
router.post('/login', loginUsers)
router.post('/google/login', loginGoogleUsers)
router.post('/register', registerUsers)
router.post('/google/register', registerGoogleUsers)
router.delete('/deleteUser/:id', isAdmin, deleteUser)
router.put('/updateUser/', isAdmin, updateUser)
router.put('/updateUserProfile/', isAuth, updateUserProfile)
router.put('/changePassword', isAuth, updatePassword)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)
export default router
