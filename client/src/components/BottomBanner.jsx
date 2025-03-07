import React, {useState} from "react";
import avatar from "../Images/te.png";
import addPost from "../Images/more.png";
import Home from "../Images/home.png";
import Noti from "../Images/bell2.png";
import chat from "../Images/chat.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MobCreatePost from "./MobCreatePost";

function BottomBanner() {
  const { userData } = useSelector((state) => state.user);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
    const openPopup = () => {
      setIsPopupOpen(true);
    };
  
    const closePopup = () => {
      setIsPopupOpen(false);
    };

  const StyledImage = ({ src, alt }) => {
      return (
        <img
          src={src}
          alt={alt}
          className="w-6 h-6 object-cover"
        />
      );}

  return (
    <div className="flex bg-gray-100 p-3 fixed bottom-0 border-t border-gray-200  gap-4 w-full justify-evenly">
      {isPopupOpen && <MobCreatePost onClose={closePopup} />}
      <Link to="/homepage">
        <StyledImage src={Home} alt="" />
      </Link>
      <Link to="">
        <StyledImage src={Noti} alt="" />
      </Link>
      <button onClick={openPopup}>
        <StyledImage src={addPost} alt="" />
        </button>
      
      <Link to="">
        <StyledImage src={chat} alt="" />
      </Link>
      <Link to="/profile">
        <StyledImage src={userData.profileImage ? userData.profileImage : avatar} alt="" />
      </Link>
    </div>
  );
}

export default BottomBanner;
