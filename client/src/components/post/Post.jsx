import React, { useEffect, useState } from "react";
import "./Post.css";
import { BaseUrl } from "../../constant.js";
import comment from "../../Images/comment.png";
import share from "../../Images/share.png";
import bookmark from "../../Images/b2.png";
import avatar from "../../Images/avatar.png";
import edit from "../../Images/edit.png";
import Likee from "../../Images/like.png";
import unlike from "../../Images/unlike.png";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Post = ({ data }) => {
  const [postOwner, setPostOwner] = useState(null);
  const { userData } = useSelector((state) => state.user);
  const [isPostLiked, setIsPostLiked] = useState(
    data.likes.includes(userData._id)
  );
  const [totalLikes, setTotalLikes] = useState(data.likes.length);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
  
    const fetchPostOwner = async () => {
      try {
        const response = await axios.get(
          `${BaseUrl}/users/getUser/${data.author}`
        );
        setPostOwner(response.data.data);
      } catch (error) {
        console.log("Error fetching post owner:", error);
        setPostOwner({ userName: "Unknown User", profileImage: avatar }); // Provide default data
      }
    };

    if (data.author) {
      fetchPostOwner();
    }
  }, [data.author]); 

  const handleLike = async () => {
    await axios.put(`${BaseUrl}/posts/${data._id}/like_dislike`);
    if (isPostLiked) setTotalLikes(totalLikes - 1);
    else setTotalLikes(totalLikes + 1);
    setIsPostLiked((prev) => !prev);
  };

  const openProfile = async() => {
    navigate(`/profile/${postOwner._id}`)
  }
  
  if(data === null) return <div>No Posts to show</div>
  return (
    <div className="Post">
      <div className="postowner flex items-center gap-2">
        <img
          className="rounded-full cursor-pointer"
          src={postOwner?.profileImage ? postOwner.profileImage : avatar}
          alt=""
          onClick={openProfile}
        />
        <span className=" font-bold cursor-pointer" onClick={openProfile}>
          {postOwner?.userName || "Loading..."}
        </span>
        {"/profile"===location.pathname ? (<img
          className="ml-auto! edit h-6! w-6! cursor-pointer"
          src={edit}
          alt=""
        />) : ("")}
        
      </div>
      <img src={data.postImage} alt="" className="w-52" />

      <div className="postReact">
        <img
          src={isPostLiked ? Likee : unlike}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
        <img src={comment} alt="" />
        <img src={share} alt="" />
        <img src={bookmark} alt="" className="ml-auto!" />
      </div>

      <span style={{ fontSize: "14px" }}>{totalLikes} likes</span>

      <div className="detail">
        <span>
          {" "}
          <b>
            {postOwner?.firstName || "Loading..."}{" "}
            {postOwner?.lastName || "Loading..."}
          </b>{" "}
        </span>
        <span>{data.caption}</span>
      </div>
    </div>
  );
};

export default Post;
