import React, {useState, useEffect} from "react";
import "./ProfileCard.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import avatar from "../../Images/te.png";
import dots from "../../Images/dots.png";
import defaultCover from "../../Images/defaultCover.jpeg";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/userSlice.js";
import { useParams, useNavigate } from "react-router-dom";
import EditProfile from "../EditProfile.jsx";
import Logout from "../../Images/exit.png";
import Edit from "../../Images/edit2.png";

const ProfileCard = ({ location }) => {

  const { allPosts } = useSelector((state) => state.posts);
  const { userData } = useSelector((state) => state.user);
  const { allUsers } = useSelector((state) => state.user);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userProfileData, setUserProfileData] = useState(null);
  
  useEffect(() => {
    // Determine which user's profile to display
    if (id) {
      const foundUser = allUsers.find((user) => user._id === id); // replace users with your user fetching logic.
      if (foundUser) {
        setUserProfileData(foundUser);
      } else {
        console.error("User not found");
        setUserProfileData(null);
      }
    } else {
      // If no userId, display the logged-in user's profile
      setUserProfileData(userData);
    }
  }, [id, userData]);

  let numberOfFollowers = 0;
  let numberOfFollowing = 0;
  if (userProfileData) {
    numberOfFollowers = userProfileData.followers?.length ?? 0;
    numberOfFollowing = userProfileData.following?.length ?? 0;
  }

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setIsEditProfileOpen(false);
  };
  
  function setLogout() {
    dispatch(logout());
    navigate("/login");
  }

  const openEditProfile = () => {
    setIsEditProfileOpen(true);
  };


  const OpenMenu = ({onClose}) => {
    
    return(
    <div
      className="fixed inset-0 z-50 flex justify-center items-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
    <div className="flex justify-end flex-col gap-5 pb-5 bg-white rounded-lg shadow-lg p-6 w-45">
      
      <div className="flex items-center gap-4">
        <img src={Edit} alt="" className="h-8 w-8" />
        <button
          className="cursor-pointer hover:text-blue-700 transition duration-200 ease-in-out rounded "
          onClick={openEditProfile}
        >
          Edit Profile
        </button>
      </div>

      <div className="flex items-center gap-4">
        <img src={Logout} alt="" className="h-8 w-8" />
        <button
          onClick={setLogout}
          className="cursor-pointer hover:text-blue-700 transition duration-200 ease-in-out rounded "
        >
          Logout
        </button>
      </div>
      
      <button onClick={onClose}
        className="w-full mt-4! rounded-2xl bg-gray-400 text-white hover:text-blue-800 font-semibold py-2">
        Cancel
      </button>
    </div>;
    </div>)
  };

  if(userProfileData === null) return <div>Loading...</div>

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img
          src={userProfileData.coverImage ? userProfileData.coverImage : defaultCover}
          alt="image not available"
          className="max-h-60"
        />
        <img
          src={userProfileData.profileImage ? userProfileData.profileImage : avatar}
          alt="not avaialable"
        />
        {!id && window.innerWidth <= 768 &&
        <img
          src={dots}
          alt=""
          className="absolute top-3 right-3 h-4 w-4 cursor-pointer"
          onClick={openPopup}
        />}
        {isPopupOpen && <OpenMenu onClose={closePopup} />}
        {isEditProfileOpen && <EditProfile onClose={closePopup} />} 
      </div>

      <div className="ProfileName">
        <span>
          {userProfileData.firstName} {userProfileData.lastName}
        </span>
        {id? (<span>{userProfileData.bio ? userProfileData.bio : "No bio available"}</span>) : (
        <span>{userProfileData.bio ? userProfileData.bio : "write about yourself..."}</span>) }
      </div>

      <div className="followStatus">
        <hr />
        <div className="flex justify-center items-center">
          <div className="follow">
            <span>{numberOfFollowers}</span>
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{numberOfFollowing}</span>
            <span>Following</span>
          </div>

          {location === "profile" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>
                  {allPosts
                    ? allPosts.filter((post) => post.author === userData._id)
                        .length
                    : ""}
                </span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      
      {location === "profile" || id ? (
        ""
      ) : (
        <span>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={`/profile`}
          >
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
