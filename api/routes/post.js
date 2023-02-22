import express from 'express'
import { deletePost, getPosts, putPost } from '../controllers/post.js'

const router = express.Router()
// text post
router.get('/',getPosts)
router.put('/', putPost)
router.delete('/', deletePost)
// for image post

export default router