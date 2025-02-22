import React from "react";
import "./profileSidee.css";
import FollowersCard from "../followers card/FollowersCard";
import LogoSearch from "../logoSearch/LogoSearch";
import ProfileCard from "../profileCard/ProfileCard";

export default function ProfileSide() {
  return (
    <div className="ProfileSide">
      <LogoSearch />
      <ProfileCard/>
      <FollowersCard />
    </div>
  );
}