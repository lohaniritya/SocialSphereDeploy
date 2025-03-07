import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import avatar from '../Images/avatar.png'
import {followUnfollowUser} from '../slices/userSlice.js'
import axios from "axios";
import { BaseUrl } from '../constant.js';
import { Navigate, useNavigate } from 'react-router-dom';

const UserFollow = ({ person }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userData } = useSelector((state) => state.user); 
    const [isFollowing, setIsFollowing] = useState(person.followers.includes(userData._id));


    const handleFollow = async() => {
        const res = await axios.put(`${BaseUrl}/users/${person._id}/followUnfollowUser`)
        dispatch(followUnfollowUser(res.data.data))
        setIsFollowing((prev) => !prev)
    }

    const openProfile = async() => {
        navigate(`/profile/${person._id}`)
    }

    return (
        <div className="follower">

            <div className='personName cursor-pointer' onClick={openProfile}>
                <img src={person.profileImage ? person.profileImage : avatar} alt="" className='followerImg'/>
                <div className="name">
                  <span className='namee'>{person.firstName}  {person.lastName}</span>
                  <span className='username'>@{person.userName}</span>
                </div>
            </div>

            <button className="cursor-pointer" onClick={handleFollow}>
                {isFollowing ? "Unfollow" : "Follow"}
            </button>
        </div>
    )
}

export default UserFollow