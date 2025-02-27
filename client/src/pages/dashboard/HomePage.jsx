import React, {useState, useEffect} from 'react'
import './home.css'
import ProfileSide from '../../components/profileSide/ProfileSide.jsx'
import PostSide from '../../components/postSide/PostSide.jsx';
import RightSide from '../../components/rightSide/RightSide.jsx';
import LogoSearch from '../../components/logoSearch/LogoSearch.jsx';
import BottomBanner from '../../components/BottomBanner.jsx';
import Post from "../../components/post/Post.jsx";
import { getAllPosts } from "../../slices/postSlice.js";
import { BaseUrl } from "../../constant.js";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import FollowersCard from '../../components/followers card/FollowersCard.jsx';

function HomePage() {
  let { allPosts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const {data} = await axios.get(`${BaseUrl}/posts/getAllPosts`);
        const sortedPosts = [...data.data].sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        dispatch(getAllPosts(sortedPosts))
      } catch (err) {
        console.log("Error fetching posts:", err);  
      } 
    };

    fetchPosts(); 
  }, []);

  const [isMediumScreen, setIsMediumScreen] = useState(window.innerWidth >= 768); 
  useEffect(() => {
    const handleResize = () => {
      setIsMediumScreen(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
   
  return (
    <>
      {!isMediumScreen && (
        <div>
          <LogoSearch/>
          <div className='pt-15 pb-3 pl-3'>People you may know...</div>
          <FollowersCard className="w-auto"/>
          <div className="Posts max-w-120 mx-auto!">
            {allPosts?.map((post, id) => {
            return <Post data={post} key={id} />;})}
          </div>
          <br/>
          <br/>
          
          <BottomBanner />
        </div>
      )}
      {isMediumScreen && (
        <div className="Home">
          <ProfileSide />
          <PostSide />
          <RightSide />
        </div>
      )}
    </>
  )
}

export default HomePage