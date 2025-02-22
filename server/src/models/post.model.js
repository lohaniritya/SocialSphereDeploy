import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    postImage:{type:String, required:true},
    caption:{type:String, default:''},
    likes:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
    comments:[{type:mongoose.Schema.Types.ObjectId, ref:'Comment'}],
    author:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
},
{ timestamps: true }
);
export const Post = mongoose.model('Post', postSchema);