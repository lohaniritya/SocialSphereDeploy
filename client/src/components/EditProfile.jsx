import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BaseUrl } from "../constant.js";
import { getUser } from "../slices/userSlice.js";

function EditProfile({ onClose }) {
  const { userData } = useSelector((state) => state.user);
  const updatedUserData = {
    ...userData,
    newPswd: "",
    confirmPswd: "",
  };
  const [formData, setFormData] = useState(updatedUserData);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finaldata = new FormData();

    if (profileImage) finaldata.append("profileImage", profileImage);
    if (coverImage) finaldata.append("coverImage", coverImage);

    await axios.post(`${BaseUrl}/users/editImage`, finaldata);
    const { data } = await axios.post(`${BaseUrl}/users/editProfile`, formData);
    dispatch(getUser(data.data));
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-120 flex flex-col justify-center">
        <form className="flex flex-col gap-2 text-gray-600">
          <h3 className="text-center text-2xl text-black font-bold mb-5!">Update Your Info</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <label htmlFor="" className="text-sm">
                First Name
              </label>
              <input
                type="text"
                placeholder="First Name"
                className="border rounded-md p-1.5 w-full"
                name="firstName"
                onChange={handleChange}
                value={formData.firstName}
              />
            </div>
            <div>
              <label htmlFor="" className="text-sm">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Last Name"
                className="border rounded-md p-1.5 w-full"
                name="lastName"
                onChange={handleChange}
                value={formData.lastName}
              />
            </div>
          </div>

          <div>

            <label htmlFor="" className="text-sm">
              Username
            </label>
            <input
              type="text"
              placeholder="Username"
              className="border rounded-md p-1.5 w-full"
              name="userName"
              onChange={handleChange}
              value={formData.userName}
            />
          </div>

          <div>
            <label htmlFor="" className="text-sm">
              Email
            </label>
            <input
              type="text"
              placeholder="Email"
              className="border rounded-md p-1.5 w-full"
              name="email"
              onChange={handleChange}
              value={formData.email}
            />
          </div>

          <div>
          <label htmlFor="" className="text-sm">
              Bio
            </label>
            <input
              type="text"
              placeholder="Bio"
              className="border rounded-md p-1.5 w-full"
              name="bio"
              onChange={handleChange}
              value={formData.bio}
            />
          </div>
          
          <div >
          <label htmlFor="" className="text-sm">
              Update Password
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <input
              type="password"
              placeholder="New Password"
              className="border rounded-md p-1.5 w-full"
              name="newPswd"
              onChange={handleChange}
              value={formData.newPswd}
            />
            <input
              type="password"
              placeholder="Confirm new Password"
              className="border rounded-md p-1.5 w-full"
              name="confirmPswd"
              onChange={handleChange}
              value={formData.confirmPswd}
            />
            </div>
          </div>

          

          <div className="">
            <label className="text-sm ">
              Profile Image
            </label>
            <input className="border p-1.5 rounded-md w-full" type="file" name="profileImage" onChange={onImageChange} />
          </div>

          <div className="">
            <label className="text-sm">
              Cover Image
            </label>
            <input className="border p-1.5 rounded-md w-full" type="file" name="coverImage" onChange={onImageChange} />
          </div>


          <div className="flex justify-center gap-3 mt-6!">
            <button className="button infoButton" onClick={handleSubmit}>
              Update
            </button>
            <button
              className="px-5 rounded-xl bg-gray-400 text-white hover:text-blue-800 font-semibold py-2"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>


        </form>
      </div>
    </div>
  );
}

export default EditProfile;
