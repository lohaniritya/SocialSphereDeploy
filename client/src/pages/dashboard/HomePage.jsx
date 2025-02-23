import React from 'react'
import './home.css'
import ProfileSide from '../../components/profileSide/ProfileSide.jsx'
import PostSide from '../../components/postSide/PostSide.jsx';
import RightSide from '../../components/rightSide/RightSide.jsx';

function HomePage() {

  return (
    <>
      <div className='Home'>
        <ProfileSide/>
        <PostSide/>
        <RightSide/>
      </div>
    </>
  )
}

export default HomePage