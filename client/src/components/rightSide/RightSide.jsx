import React from 'react';
import './rightSide.css';
import Home from '../../Images/home.png';
import Settings from '../../Images/settings.png';
import Noti from '../../Images/bell2.png';
import chat from '../../Images/chat.png';
import { Link } from 'react-router-dom';
import { TrendData } from '../TrendData.js';

const RightSide = () => {
    return (
        <div className='RightSide'>
            <div className="navIcons">

                <Link to='/homepage'>
                    <img src={Home} alt="" />
                </Link>
                <Link to=''>
                    <img src={Settings} alt="" />
                </Link>
                <Link to=''>
                    <img src={Noti} alt="" />
                </Link>
                <Link to=''>
                    <img src={chat} alt="" />
                </Link>
            </div>

            <div className='TrendCard'>
                <h3>Trending for you</h3>

                {TrendData.map((trend) => {
                    return (
                    <div className="trend">
                        <span>#{trend.name}</span>
                        <span>{trend.shares}k Shares</span>
                    </div>
                    
                    )
                })}

            </div>
        </div>
    )
}

export default RightSide