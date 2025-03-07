import React, {useState, useEffect} from "react";
import "./InfoCard.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const InfoCard = () => {

  const { userData } = useSelector((state) => state.user);
  const { allUsers } = useSelector((state) => state.user);
  const { id } = useParams();
  const [externalUserData, setExternalUserData] = useState(null);

  useEffect(() => {
    if (id && allUsers) {
      const foundUser = allUsers.find((user) => user._id === id);
      if (foundUser) {
        setExternalUserData(foundUser);
      } else {
        setExternalUserData(null); // Explicitly set to null if not found
      }
    } else {
      setExternalUserData(null); //if no id, reset the external user data.
    }
  }, [id, allUsers]);

  const displayData = externalUserData || userData;
 

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
      </div>

      <div className="info">
        <span>
          <b>Username: </b>
        </span>
        <span> {displayData?.userName}</span>
      </div>
      <div className="info">
        <span>
          <b>Gender: </b>
        </span>
        <span>{displayData?.gender}</span>
      </div>
      <div className="info">
        <span>
          <b>Email:  </b>
        </span>
        <span>{displayData?.email}</span>
      </div>
    </div>
  );
};

export default InfoCard;