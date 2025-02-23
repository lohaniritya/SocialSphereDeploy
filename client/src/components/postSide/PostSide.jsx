import React, { useState, useRef, useEffect } from "react";
import PhotoOutlinedIcon from "@mui/icons-material/PhotoOutlined";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useDispatch, useSelector } from "react-redux";
import Post from "../post/Post.jsx";
import "./postSide.css";
import { useLocation } from 'react-router-dom';
import avatar from "../../Images/avatar.png";
import axios from "axios";
import { BaseUrl } from "../../constant.js";
import { getAllPosts, createNewPost } from "../../slices/postSlice.js";
import Toast from "../Toast.jsx";

export default function PostSide() {
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const dispatch = useDispatch();
  const newCaption = useRef();
  const location = useLocation();
  const { userData } = useSelector((state) => state.user);
  let { allPosts } = useSelector((state) => state.posts);
  axios.defaults.withCredentials = true

  const [toastMessage, setToastMessage] = useState(null);
      
        const showToast = (message) => {
          setToastMessage(message);
        };
  
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const reset = () => {
    setImage(null);
    newCaption.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (image) {
      const formdata = new FormData();
      formdata.append("author",userData._id)
      formdata.append("caption", newCaption.current.value);
      formdata.append("postImage", image); // Append the image directly
      
      try {
        const res = await axios.post('https://socialsphere-5zqt.onrender.com/api/v1/posts/createPost', formdata); 
        // const res = await axios.post(`${BaseUrl}/posts/createPost`, data); 
        dispatch(createNewPost(res.data.data))
        
        reset();
        showToast("Post created")
      } catch (error) {
        console.log("Error creating post:", error);
      }
    } else {
      console.log("Please select an image.");
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const {data} = await axios.get(`${BaseUrl}/posts/getAllPosts`);
        const sortedPosts = [...data.data].sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        dispatch(getAllPosts(sortedPosts))
      } catch (err) {
        console.log("Error fetching posts:", err);  
      } 
    };

    fetchPosts(); 
  }, []);

  if("/profile"===location.pathname){
    allPosts = allPosts.filter((post) => post.author === userData._id);
  }

  return (
    <div className="PostSide">
      <div className="PostShare">
        <img
          src={userData.profileImage ? userData.profileImage : avatar}
          alt=""
        />

        <div>
          <input
            type="text"
            placeholder="What's happening ?"
            required
            ref={newCaption}
          />

          <div className="postOptions">
            <div
              className="option"
              style={{ color: "var(--photo)" }}
              onClick={() => imageRef.current.click()}
            >
              <PhotoOutlinedIcon />
              Photo
            </div>

            <div className="option" style={{ color: "var(--video)" }}>
              <PlayCircleOutlineIcon />
              Video
            </div>
            <div className="option" style={{ color: "var(--location)" }}>
              <LocationOnOutlinedIcon />
              Location
            </div>
            <div className="option" style={{ color: "var(--shedule)" }}>
              <CalendarMonthOutlinedIcon />
              Shedule
            </div>

            <button className="button ps-button" onClick={handleSubmit}>
              {" "}
              Share{" "}
            </button>
            {toastMessage && <Toast message={toastMessage} />}

            <div style={{ display: "none" }}>
              <input
                type="file"
                name="myImage"
                ref={imageRef}
                onChange={onImageChange}
              />
            </div>
          </div>

          {image && (
            <div className="previewImage">
              <CloseOutlinedIcon onClick={() => setImage(null)} />
              <img src={URL.createObjectURL(image)} alt="" />
            </div>
          )}
        </div>
      </div>

      <div className="Posts">
        {allPosts?.map((post, id) => {
          return <Post data={post} key={id} />;
        })}
      </div>
    </div>
  );
}
