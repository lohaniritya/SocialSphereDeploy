import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { deleteImage, uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic regex
  return emailRegex.test(email);
}

const register = asyncHandler(async (req, res) => {
  const { userName, email, firstName, lastName, password } = req.body;

  if (
    [userName, email, firstName, lastName, password].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are mandatory");
  }

  if (!isValidEmail(email)) throw new ApiError(409, "Invalid email");

  const existedUser = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  let profileImageLocalPath;
  let coverImageLocalPath;

  if (
    req.files &&
    Array.isArray(req.files.profileImage) &&
    req.files.profileImage.length > 0
  ) {
    profileImageLocalPath = req.files.profileImage[0].path;
  }

  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  const profileImage = await uploadOnCloudinary(profileImageLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  const newUser = await User.create({
    userName,
    email,
    firstName,
    lastName,
    password,
    profileImage: profileImage?.url || "",
    coverImage: coverImage?.url || "",
    gender: req.body.gender,
    bio: req.body.bio || "",
  });

  const isUserCreated = await User.findById(newUser._id).select(
    "-password -accessToken"
  );

  if (!isUserCreated) return new ApiError(400, "user registration failed");

  return res
    .status(201)
    .json(new ApiResponse(201, isUserCreated, "User registered Successfully"));
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    throw new ApiError(400, "email is required");
  }

  const user = await User.findOne({
    $and: [{ email }],
  });

  if (!user) {
    throw new ApiError(
      404,
      "User does not exist or email and pswd does not match"
    );
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // const options = {
  //     httpOnly: true,
  //     secure : true
  // }

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    path: "/",
    sameSite: "Lax",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully"
      )
    );
});

const logout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, // this removes the field from document
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
      user._id
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const changePassword = asyncHandler(async (req, res) => {
  const { oldPswd, newPswd, confirmPswd } = req.body;

  if (newPswd !== confirmPswd)
    throw new ApiError(400, "password doesn't match");
  if (!oldPswd || !newPswd) throw new ApiError(400, "password is required");
  const user = await User.findById(req.user?._id);

  const isPasswordValid = user.isPasswordCorrect(oldPswd);
  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid old password");
  }
  user.password = newPswd;
  await user.save({ validateBeforeSave: false });

  return res.status(200).json(new ApiResponse(200, {}, "password updated"));
});

const getUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);

  if (user) {
    const userDataToSend = {
      _id: user._id,
      userName: user.userName,
      profileImage: user.profileImage,
      coverImage: user.coverImage,
      firstName: user.firstName,
      lastName: user.lastName,
      bio: user.bio,
    };
    return res
      .status(200)
      .json(new ApiResponse(200, userDataToSend, "fetched current user"));
  } else {
    return res.status(200).json(new ApiResponse(200, null, "no user found"));
  }
});

const editProfile = asyncHandler(async (req, res) => {
  const { userName, email, firstName, lastName, bio, newPswd, confirmPswd} = req.body;
  if (
    [userName, email, firstName, lastName].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are mandatory");
  }
  if (!isValidEmail(email)) throw new ApiError(409, "Invalid email");
  if (newPswd !== confirmPswd)
    throw new ApiError(400, "password doesn't match");
  
  if (userName !== req.user.userName ){
    const existedUser = await User.findOne({
      $or: [{ userName }],
    });
    if (existedUser) {
      throw new ApiError(409, "User with email or username already exists");
    }
  }
  if(email !== req.user.email){
    const existedUser = await User.findOne({
      $or: [{ email }],
    });
    if (existedUser) {
      throw new ApiError(409, "User with email or username already exists");
    }
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        userName,
        email,
        firstName,
        lastName,
        bio
      },
    },
    { new: true }
  ).select("-password -refreshToken");
  user.password = newPswd
  await user.save({ validateBeforeSave: false });

  return res.status(200).json(new ApiResponse(200, user, "Details updated"));
});

const editImage = asyncHandler(async (req, res) => {
  // Get new file path
  let editprofileImage;
  let editcoverImage;

  if (
    req.files &&
    Array.isArray(req.files.profileImage) &&
    req.files.profileImage.length > 0
  ) {
    editprofileImage = req.files.profileImage[0].path;
  }

  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    editcoverImage = req.files.coverImage[0].path;
  }

  // Upload new file on cloudinary
  const profileImage = await uploadOnCloudinary(editprofileImage);
  const coverImage = await uploadOnCloudinary(editcoverImage);

  // Delete assets from cloudinary
  if (profileImage && profileImage.url) {
    if (req.user.profileImage) await deleteImage(req.user.profileImage);
  }
  if (coverImage && coverImage.url) {
    if (req.user.coverImage) await deleteImage(req.user.coverImage);
  }

  // Edit the database
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        profileImage: profileImage?.url || req.user.profileImage,
        coverImage: coverImage?.url || req.user.coverImage,
      },
    },
    { new: true }
  ).select("-password -refreshToken");

  return res.status(200).json(new ApiResponse(200, user, "Details updated"));
});

const getAllUsers = asyncHandler(async (req, res) => {
  let users = await User.find();
  users = users.map((user) => {
    const { password, ...otherDetails } = user._doc;
    return otherDetails;
  });
  return res.status(200).json(new ApiResponse(200, users, "Fetched all users"));
});

const followUnfollowUser = asyncHandler(async (req, res) => {
  let user = req.user;
  let id = req.params.id;

  try {
    // *** KEY CHANGE: Execute the query to get the target user ***
    const target = await User.findById(id);

    if (!user || !target) {
      // Check if both users exist
      return res.status(404).json(new ApiResponse(404, null, "User not found")); // Or appropriate error code
    }

    const hasUserFollowed = await User.findOne({
      _id: user._id,
      following: { $in: [target._id] },
    });

    if (hasUserFollowed) {
      await User.findByIdAndUpdate(id, { $pull: { followers: user._id } });
      await User.findByIdAndUpdate(user._id, { $pull: { following: id } });
    } else {
      await User.findByIdAndUpdate(id, { $addToSet: { followers: user._id } }); // Use _id
      await User.findByIdAndUpdate(user._id, { $addToSet: { following: id } }); // Use _id
    }

    // Refresh the user data (optional but recommended)
    const updatedUser = await User.findById(user._id); // Get the updated user

    return res
      .status(200)
      .json(new ApiResponse(200, updatedUser, "follow/unfollow success")); // Send back updated user
  } catch (error) {
    console.log("Error following/unfollowing:", error);
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Error following/unfollowing")); // Handle errors
  }
});

const migratePassword = asyncHandler(async (_, res) => {
  try {
    const users = await User.find({ password: { $not: /^$2b\$|^$argon2i/ } });
    
    for (const user of users) {
      user.password = "abhi123";
      // const hashedPassword = await bcrypt.hash(user.password, 10)
      await user.save({ validateBeforeSave: false });
    }
  } catch (error) {
    console.log('Password migration failed:', error);
  }

  return res.status(200).json(new ApiResponse(200, {}, "password updated"));
});

export {
  register,
  login,
  logout,
  refreshAccessToken,
  changePassword,
  getUser,
  editProfile,
  editImage,
  getAllUsers,
  followUnfollowUser,
  migratePassword
};