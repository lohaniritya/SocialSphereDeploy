import React, { useState, useEffect } from "react";
import "./Profile.css";
import ProfileCard from "../../components/profileCard/ProfileCard.jsx";
import PostSide from "../../components/postSide/PostSide.jsx";
import ProfileLeft from "../../components/profileLeft/ProfileLeft.jsx";
import RightSide from "../../components/rightSide/RightSide.jsx";
import LogoSearch from "../../components/logoSearch/LogoSearch.jsx";
import BottomBanner from "../../components/BottomBanner.jsx";
import Post from "../../components/post/Post.jsx";
import { getPostByUser } from "../../slices/postSlice.js";
import { BaseUrl } from "../../constant.js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const [isMediumScreen, setIsMediumScreen] = useState(
    window.innerWidth >= 768
  );
  useEffect(() => {
    const handleResize = () => {
      setIsMediumScreen(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let { userData } = useSelector((state) => state.user);
  let { allPostByUser } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const { data } = await axios.get(
          `${BaseUrl}/posts/getPost/${userData._id}`
        );
        const sortedPosts = [...data.data].sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        dispatch(getPostByUser(sortedPosts));
      } catch (err) {
        console.log("Error fetching posts:", err);
      }
    };

    fetchUserPosts();
  }, []);

  return (
    <>
      {!isMediumScreen && (
        <div>
          <LogoSearch />
          <div className="py-15 px-4! flex flex-col max-w-120 items-center! mx-auto!">
            <ProfileCard location="profile" className="max-w-120 mx-auto!"/>
            <div className="Posts max-w-120 mx-auto!">
              {allPostByUser?.map((post, id) => {
                return <Post data={post} key={id} />;
              })}
            </div>
          </div>
          <BottomBanner />
        </div>
      )}
      {isMediumScreen && (
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
      )}
    </>
  );
};

export default Profile;
