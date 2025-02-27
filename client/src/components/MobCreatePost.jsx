import React, { useState, useRef, useEffect } from "react";
import PhotoOutlinedIcon from "@mui/icons-material/PhotoOutlined";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BaseUrl } from "../constant.js";
import { createNewPost } from "../slices/postSlice.js";
import Toast from "./Toast.jsx";

function MobCreatePost({ onClose }) {
  const { userData } = useSelector((state) => state.user);
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const dispatch = useDispatch();
  const newCaption = useRef();
  axios.defaults.withCredentials = true;

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
      formdata.append("author", userData._id);
      formdata.append("caption", newCaption.current.value);
      formdata.append("postImage", image); // Append the image directly

      try {
        const res = await axios.post(`${BaseUrl}/posts/createPost`, formdata);
        dispatch(createNewPost(res.data.data));
        reset();
        showToast("Post created");
        onClose();
      } catch (error) {
        console.log("Error creating post:", error);
      }
    } else {
      console.log("Please select an image.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="bg-white rounded-lg shadow-lg sm:w-[450px] min-w-[250px] flex flex-col">
        <h2 className="font-black text-2xl text-center pt-4">Create Post</h2>

        <div className="flex flex-col gap-3 p-5">
          <input
            className="p-3 text-sm h-10 border border-gray-300"
            type="text"
            placeholder="What's happening ?"
            required
            ref={newCaption}
          />
          <div className="flex flex-col gap-5 ">
            <div className="flex justify-evenly!">
            <div
              style={{ color: "var(--photo)" }}
              onClick={() => imageRef.current.click()}
            >
              <PhotoOutlinedIcon /> Photo
            </div>
            <div className="" style={{ color: "var(--video)" }}>
              <PlayCircleOutlineIcon />
              Video
            </div>
            <div className="hidden sm:block" style={{ color: "var(--location)" }}>
              <LocationOnOutlinedIcon />
              Location
            </div>
            </div>
            <div className="flex justify-center">
            <button className="button w-25 justify-center" onClick={handleSubmit}>
              {" "}
              Share{" "}
            </button>
            </div>
            {toastMessage && <Toast message={toastMessage} />}
            <div style={{ display: "none" }}>
              <input
                type="file"
                name="myImage"
                ref={imageRef}
                onChange={onImageChange}
              />
            </div>
            {image && (
              <div className="relative">
                <CloseOutlinedIcon className="absolute cursor-pointer right-1" onClick={() => setImage(null)} />
                <img className="" src={URL.createObjectURL(image)} alt="" />
              </div>
            )}
          </div>
        </div>
        <button
          className="w-full text-blue-600 hover:text-blue-800 font-semibold py-5"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default MobCreatePost;
