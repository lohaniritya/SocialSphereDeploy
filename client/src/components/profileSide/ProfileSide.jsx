import React from "react";
import "./profileSidee.css";
import FollowersCard from "../followers card/FollowersCard.jsx";
import LogoSearch from "../logoSearch/LogoSearch.jsx";
import ProfileCard from "../profileCard/ProfileCard.jsx";

export default function ProfileSide() {
  return (
    <div className="ProfileSide">
      <LogoSearch />
      <ProfileCard/>
      <FollowersCard />
    </div>
  );
}