import React from "react";
import {BaseUrl} from '../../constant.js'
import logo from "../../Images/logoe.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Toast from "../../components/Toast.jsx";

function SignUp() {
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmpass: "",
  });

  const [toastMessage, setToastMessage] = useState(null);
  
    const showToast = (message) => {
      setToastMessage(message);
    };

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const element = document.getElementById("error-msg");
  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      if (!(input.password === input.confirmpass)) {
        element.innerHTML = "Password and Confirm Password must be the same."
      }
      const res = await axios.post(`${BaseUrl}/users/register`, input);
      
      if (res.data.success) {
        navigate("/login");
        setInput({
          userName: "",
          email: "",
          password: "",
          firstName: "",
          lastName: "",
        });
      }
      showToast('User created')
    } catch (error) {
      element.innerHTML = error.response.data.message
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row  md:justify-evenly md:items-center  h-screen">
        {/* Left Side  */}
        <div className="flex flex-col items-center gap-4 p-5 md:pl-13">
            <div className="flex gap-5 items-center">
              <img src={logo} alt="logo" className=" h-10 w-10 md:h-18 md:w-18" />
              <h2 className="text-purple-800 text-2xl md:text-4xl font-bold">Welcome !</h2>
            </div>
            <h5 className="font-bold">
              Explore the ideas throughout <br className="hidden"/> the world.
            </h5>
        </div>

        {/* Right side */}
        <div className=" rounded-2xl p-5 bg-white text-xs md:text-sm max-w-80 md:max-w-none mx-auto! md:mx-0!">
          <form onSubmit={signupHandler} className="flex flex-col items-center justify-center gap-2 md:gap-3">
            <h3 className="text-xl md:text-2xl font-bold mb-2! md:p-4 text-gray-800">Sign Up</h3>
            <div className="flex flex-col md:flex-row gap-2 w-full">
              <input
                type="text"
                placeholder="First Name"
                className=" p-2 md:p-3 text-gray-600 border-none outline-none bg-gray-200 rounded-lg "
                name="firstName"
                onChange={changeEventHandler}
                value={input.firstName}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="p-2 text-gray-600 border-none outline-none bg-gray-200 md:p-3 rounded-lg "
                name="lastName"
                onChange={changeEventHandler}
                value={input.lastName}
              />
            </div>
            <div className="flex  w-full">
              <input
                type="text"
                placeholder="Username"
                className="border-none text-gray-600 outline-none bg-gray-200 rounded-lg p-2 md:p-3 w-full"
                name="userName"
                onChange={changeEventHandler}
                value={input.userName}
              />
            </div>
            <div className="flex  w-full">
              <input
                type="text"
                placeholder="Email"
                className="border-none outline-none text-gray-600 bg-gray-200 rounded-lg p-2 md:p-3 w-full"
                name="email"
                onChange={changeEventHandler}
                value={input.email}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-2 w-full">
              <input
                type="password"
                placeholder="Password"
                className="border-none outline-none text-gray-600 bg-gray-200 rounded-lg p-2 md:p-3 w-full"
                name="password"
                onChange={changeEventHandler}
                value={input.password}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="border-none outline-none text-gray-600 bg-gray-200 rounded-lg p-2 md:p-3 w-full"
                name="confirmpass"
                onChange={changeEventHandler}
                value={input.confirmpass}
              />
            </div>

            <span id="error-msg" className="text-red-600 error-msg pt-2"></span>

            <span className="text-gray-600">
              Already have an account ?{"  "}
              <Link
                to="/login"
                className="font-medium text-primary text-blue-500 transition-all duration-200 hover:underline"
              >
                Login here
              </Link>
            </span>

            <button className="button" type="submit">
              {" "}
              SignUp{" "}
            </button>
            {toastMessage && <Toast message={toastMessage} />}
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;