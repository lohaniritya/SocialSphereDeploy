import React from "react";
import "./Profile.css";
import ProfileCard from "../../components/profileCard/ProfileCard";
import PostSide from "../../components/postSide/PostSide";
import ProfileLeft from "../../components/profileLeft/ProfileLeft";
import RightSide from "../../components/rightSide/RightSide";

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
