import mongoose, {Schema} from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowecase: true,
      trim: true,
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, 'password must be at least 6 characters long'], // Minimum length
    },

    profileImage: {
      type: String,
      default: "",
    },

    coverImage: {
      type: String, // cloudinary url
    },

    bio: { 
      type: String, 
      default: "" 
    },

    gender: { 
      type: String, 
      default: "",
      enum: ["Male", "Female", ""], 
    },

    followers: [{ 
      type: Schema.Types.ObjectId, 
      ref: "User" 
    }],

    following: [{ 
      type: Schema.Types.ObjectId, 
      ref: "User" 
    }],

    posts: [{ 
      type: Schema.Types.ObjectId, 
      ref: "Post" 
    }],

    bookmarks: [{ 
      type: Schema.Types.ObjectId, 
      ref: "Post" 
    }],

    refreshToken: {
      type: String,
    },
  },

  { timestamps: true }
);


userSchema.pre("save", async function (next) {
  if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
  return jwt.sign(
      {
          _id: this._id,
          email: this.email,
          userName: this.userName,
          firstName: this.fullName,
          lastName: this.lastName
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      }
  )
}
userSchema.methods.generateRefreshToken = function(){
  return jwt.sign(
      {
          _id: this._id,
          
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY
      }
  )
}

export const User = mongoose.model("User", userSchema);