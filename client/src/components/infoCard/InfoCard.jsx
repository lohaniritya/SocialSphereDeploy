import React from "react";
import "./InfoCard.css";
import { useSelector } from "react-redux";

const InfoCard = () => {

  const { userData } = useSelector((state) => state.user);

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
      </div>

      <div className="info">
        <span>
          <b>Username: </b>
        </span>
        <span> {userData.userName}</span>
      </div>
      <div className="info">
        <span>
          <b>Gender: </b>
        </span>
        <span>{userData.gender}</span>
      </div>
      <div className="info">
        <span>
          <b>Email:  </b>
        </span>
        <span>{userData.email}</span>
      </div>
    </div>
  );
};

export default InfoCard;