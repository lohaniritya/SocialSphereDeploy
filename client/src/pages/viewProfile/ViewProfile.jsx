import React, {useState, useEffect} from 'react'
import './view.css';
import { useParams, useNavigate } from 'react-router-dom';
import ProfileCard from "../../components/profileCard/ProfileCard.jsx";
import PostSide from "../../components/postSide/PostSide.jsx";
import ProfileLeft from "../../components/profileLeft/ProfileLeft.jsx";
import RightSide from "../../components/rightSide/RightSide.jsx";
import LogoSearch from "../../components/logoSearch/LogoSearch.jsx";
import BottomBanner from "../../components/BottomBanner.jsx";
import Post from "../../components/post/Post.jsx";

function ViewProfile() {

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

  return (
      <>
      {!isMediumScreen && (
        <div className=''>
          <LogoSearch />
          <div className="py-15 px-4! flex flex-col gap-3 max-w-120! items-center! mx-auto!">
            <ProfileCard/>
            <PostSide/>
          </div>
          <BottomBanner />
        </div>
      )}
      {isMediumScreen && (
        <div className="view">
          <ProfileLeft />
          <div className="view-Center">
            <ProfileCard />
            <PostSide />
          </div>
          <div className="">
            <RightSide />
          </div>
        </div>
      )}
    </>
  )
}

export default ViewProfile