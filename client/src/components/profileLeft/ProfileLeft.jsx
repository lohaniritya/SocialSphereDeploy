import React, { useState } from "react";
import Logout from "../../Images/exit.png";
import Edit from "../../Images/edit2.png";
import LogoSearch from "../logoSearch/LogoSearch";
import InfoCard from "../infoCard/InfoCard";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import Abc from "../Abc";

export default function ProfileLeft() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function setLogout() {
    dispatch(logout());
    navigate("/login");
  }

  return (
    <div className="flex flex-col justify-between h-screen pl-10 ">
      <div className="flex flex-col gap-5 items-center">
        <h1 className="font-extrabold bg-gradient-to-r from-sky-700 to-purple-600 bg-clip-text text-transparent text-3xl flex  ">
          Social Sphere
        </h1>
        <LogoSearch />
        <InfoCard />
      </div>

      <div className="flex flex-col gap-5 pb-15">
        <div className="flex items-center gap-4">
          <img src={Edit} alt="" className="h-8 w-8" />
          <button
            className="cursor-pointer hover:text-blue-700 transition duration-200 ease-in-out rounded "
            onClick={openPopup}
          >
            Edit Profile
          </button>
          {isPopupOpen && <Abc onClose={closePopup} />}
        </div>

        <div className="flex items-center gap-4">
          <img src={Logout} alt="" className="h-8 w-8" />
          <button
            onClick={setLogout}
            className="cursor-pointer hover:text-blue-700 transition duration-200 ease-in-out rounded "
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
