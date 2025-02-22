import React, { useState, useEffect } from "react";
import { BaseUrl } from "../../constant";
import { getAllUsers } from "../../slices/userSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import UserFollow from "../UserFollow";
import './followersCard.css'

function FollowersCard() {
  const dispatch = useDispatch();
  const [persons, setPersons] = useState([])
  const {userData} = useSelector(state=>state.user)

  useEffect(() => {
    const fetchPersons = async () => {
      const res = await axios.get(`${BaseUrl}/users/getAllUsers`);
      dispatch(getAllUsers(res.data.data));
      setPersons(res.data.data);
    };
    fetchPersons();
  }, []);

  return (
    <div className="FollowersCard">
      <h3 className="font-medium">People you may know...</h3>

      {persons.map((person, id) => {
        if (person._id !== userData._id) {
          return <UserFollow person={person} key={id} />;
        }
      })}
    </div>
  );
}

export default FollowersCard;
