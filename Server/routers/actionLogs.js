import express from 'express'
import {
  createAction,
  filterAction,
  getAction,
  updateAction,
} from '../controller/actionLogs.js'
import { isAuth, isAdmin } from '../utils.js'

const router = express.Router()
router.get('/', isAuth, getAction)
router.post('/create', isAuth, createAction)
router.post('/filter', isAuth, filterAction)
router.put('/update', isAuth, updateAction)

export default router