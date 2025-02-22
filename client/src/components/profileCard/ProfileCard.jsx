import React from "react";
import "./ProfileCard.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import avatar from "../../Images/te.png";
import defaultCover from "../../Images/defaultCover.jpeg";

const ProfileCard = ({ location }) => {
  const {allPosts} = useSelector((state) => state.posts);
  const { userData } = useSelector((state) => state.user);

  let numberOfFollowers = 0;
  let numberOfFollowing = 0;
  if (userData) {
    numberOfFollowers = userData.followers?.length ?? 0;
    numberOfFollowing = userData.following?.length ?? 0;
  }

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img
          src={userData.coverImage ? userData.coverImage : defaultCover}
          alt="image not available" className="max-h-70"
        />
        <img
          src={userData.profileImage ? userData.profileImage : avatar}
          alt="not avaialable"
        />
      </div>

      <div className="ProfileName">
        <span>
          {userData.firstName} {userData.lastName}
        </span>
        <span>{userData.bio ? userData.bio : "write about yourself..."}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{numberOfFollowers}</span>
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{numberOfFollowing}</span>
            <span>Following</span>
          </div>

          {location === "profile" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>
                  {allPosts ? (allPosts.filter((post) => post.author === userData._id).length):("")}
                </span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>

      {location === "profile" ? (
        ""
      ) : (
        <span>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={`/profile`}
          >
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
