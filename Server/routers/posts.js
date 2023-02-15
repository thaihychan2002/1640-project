import express from 'express';
import { getPosts,createPosts, updatePosts } from '../controller/posts.js';
const router = express.Router();

router.get('/',getPosts);
router.post('/create',createPosts);
router.post('/update',updatePosts);

export default router;