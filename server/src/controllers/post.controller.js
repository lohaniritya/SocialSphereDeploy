import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { deleteImage, uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";

const createPost = asyncHandler(async (req, res) => {

  const user = await User.findById(req.user?._id).select(
    "-password -refreshToken"
  );

  const { caption } = req.body;
  let postImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.postImage) &&
    req.files.postImage.length > 0
  ) {
    postImageLocalPath = req.files.postImage[0].path;
  }

  const postImage = await uploadOnCloudinary(postImageLocalPath);
  const newPost = await Post.create({
    caption,
    postImage: postImage?.url || "",
    author: user._id,
  });

  if (user) {
    user.posts.push(newPost._id);
    await user.save();
  }

  return res
    .status(201)
    .json(new ApiResponse(201, newPost, "New Post created"));
});

const getAllPosts = asyncHandler (async(req,res)=>{
  const allposts = await Post.find(); // Retrieves all posts
  return res
    .status(200)
    .json(new ApiResponse(200, allposts, "fetched all posts"));
})

const getAllPostsOfUser1 = asyncHandler (async(req,res)=>{
  const user = await User.findById(req.user?._id);
  const allpostsbyUser = await Post.find({ author: user });
  return res
    .status(200)
    .json(new ApiResponse(200, allpostsbyUser, "fetched posts"));
})

const likeAndDislikePost = asyncHandler (async(req,res)=>{
  const user = await User.findById(req.user?._id);
  let postId = req.params.id
  const post = await Post.findById(postId);
  if (!post) return res.status(404).json(new ApiError(400, "Post not found"));
  const hasUserLiked = await Post.findOne({ _id: postId, likes: { $in: [user] } });

  if(hasUserLiked){
    await Post.findByIdAndUpdate(
      postId,
      { $pull: { likes: user._id } }, // Use $pull to remove the userId
      { new: true } // Return the updated document
    );
  }else {
    await post.updateOne({ $addToSet: { likes: user } });
  }
  await post.save();
  return res
    .status(201)
    .json(new ApiResponse(201, post, "changed like field"));

})

// const editPost = asyncHandler(async (req,res)=>{

// })

export {createPost, getAllPosts, getAllPostsOfUser1, likeAndDislikePost}