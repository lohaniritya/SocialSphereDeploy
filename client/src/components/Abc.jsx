import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import { BaseUrl } from "../constant.js"
import { getUser } from "../slices/userSlice.js";

function Abc({ onClose }) {
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

    await axios.post(`${BaseUrl}/users/editImage`,finaldata)
    const {data} = await axios.post(`${BaseUrl}/users/editProfile`,formData)
    dispatch(getUser(data.data))
    onClose()
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-semibold mb-4">Change Profile Photo</h2>
        <form className="infoForm">
          <h3>Update Your info</h3>

          <div>
            <input
              type="text"
              placeholder="First Name"
              className="infoInput"
              name="firstName"
              onChange={handleChange}
              value={formData.firstName}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="infoInput"
              name="lastName"
              onChange={handleChange}
              value={formData.lastName}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Username"
              className="infoInput"
              name="userName"
              onChange={handleChange}
              value={formData.userName}
            />
            <input
              type="text"
              placeholder="Email"
              className="infoInput"
              name="email"
              onChange={handleChange}
              value={formData.email}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="New Password"
              className="infoInput"
              name="newPswd"
              onChange={handleChange}
              value={formData.newPswd}
            />
            <input
              type="text"
              placeholder="Confirm new Password"
              className="infoInput"
              name="confirmPswd"
              onChange={handleChange}
              value={formData.confirmPswd}
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Bio"
              className="infoInput"
              name="bio"
              onChange={handleChange}
              value={formData.bio}
            />
          </div>

          <div>
            <h5>Profile Image</h5>
            <input type="file" name="profileImage" onChange={onImageChange} />
            <h5>Cover Image</h5>
            <input type="file" name="coverImage" onChange={onImageChange} />
          </div>

          <button className="button infoButton" onClick={handleSubmit}>
            Update
          </button>
          <button
            className="w-full text-blue-600 hover:text-blue-800 font-semibold py-2"
            onClick={onClose}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default Abc;
