import express from "express";
import {createPost, getAllPosts, getAllPostsOfUser1, likeAndDislikePost} from "../controllers/post.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.route( "/createPost" ).post( upload.fields([{ name: "postImage", maxCount: 1,}]),
verifyJWT, createPost
);
router.put('/:id/like_dislike', verifyJWT, likeAndDislikePost);
router.get('/getPost/:id', verifyJWT, getAllPostsOfUser1);
router.route('/getAllPosts').get(verifyJWT, getAllPosts);

// router.put('/:id', updatePost);
// router.delete('/:id', deletePost);
// router.get('/:id/timeline', timeline);

export default router;
