import React from 'react'
import './home.css'
import ProfileSide from '../../components/profileSide/ProfileSide'
import PostSide from '../../components/postSide/PostSide';
import RightSide from '../../components/rightSide/RightSide';

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