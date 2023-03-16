import express from 'express'
import {
  getTopic,
  createTopic,
  deleteTopic,
  updateTopic,
  updateTopicStatus,
} from '../controller/topics.js'
import { isAuth, isAdmin } from '../utils.js'

const router = express.Router()
router.get('/', isAuth, getTopic)
router.post('/create', isAdmin, createTopic)
router.delete('/delete/:id', isAdmin, deleteTopic)
router.put('/update', isAdmin, updateTopic)
router.put('/updatestatus', updateTopicStatus)
export default router
