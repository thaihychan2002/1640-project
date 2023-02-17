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
} from '../controller/users.js'
import { isAuth, isAdmin } from '../utils.js'
const router = express.Router()

router.get('/', isAuth, getUsers)
router.get('/getUserByID/:id', getUserById)
router.post('/login', loginUsers)
router.post('/google/login', loginGoogleUsers)
router.post('/register', registerUsers)
router.post('/google/register', registerGoogleUsers)
router.delete('/deleteUser/:id', isAdmin, deleteUser)
router.put('/updateUser/:id', isAdmin, updateUser)
router.put('/updateUserProfile/:id', isAuth, updateUserProfile)
export default router
