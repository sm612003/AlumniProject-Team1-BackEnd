import express from 'express'
import { getAllPosts, getPostById, deletePost, addPost } from '../controllers/post.js'

const router = express.Router()

router.get('/read/blogs',getAllPosts);
router.post('/add/blogs', addPost);
router.get('/:id', getPostById);
// router.get('/:id', findByCategory);
router.delete('/:id', deletePost );

export default router