import React from "react";
import "./Profile.css";
import ProfileCard from "../../components/profileCard/ProfileCard.jsx";
import PostSide from "../../components/postSide/PostSide.jsx";
import ProfileLeft from "../../components/profileLeft/ProfileLeft.jsx";
import RightSide from "../../components/rightSide/RightSide.jsx";

const Profile = () => {
  return (
    <div className="Profile">
        <ProfileLeft />
        <div className="ProfilePage-Center">
            <ProfileCard location="profile" />
            <PostSide />
        </div>
        <div className="pr-10">
            <RightSide />
        </div>
    </div>
  );
};

export default Profile;
