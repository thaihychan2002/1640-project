import express from 'express'
import {
  getTopic,
  createTopic,
  deleteTopic,
  updateTopic,
  updateTopicStatus,
  getTopicPaginated,
} from '../controller/topics.js'
import { isAuth, isAdmin } from '../utils.js'

const router = express.Router()
router.get('/', isAuth, getTopic)
router.get('/paginate', isAuth, getTopicPaginated)
router.post('/create', isAdmin, createTopic)
router.delete('/delete/:id', isAdmin, deleteTopic)
router.put('/update', isAdmin, updateTopic)
router.put('/updatestatus', updateTopicStatus)
export default router
