import React from "react";
import { BaseUrl } from "../../constant.js";
import logo from "../../Images/logoe.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../slices/userSlice.js";
import Toast from "../../components/Toast.jsx";
axios.defaults.withCredentials = true;

function Login() {
  const [input, setInput] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
  };

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handlSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BaseUrl}/users/login`, input);
      if (res.data.success) {
        dispatch(login(res.data.data.user));
        navigate("/homepage");
        setInput({
          email: "",
          password: "",
        });
        showToast(`Welcome to Social Sphere`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-evenly  h-screen">
        {/* Left Side  */}
        <div className="flex items-center gap-20">
          <img src={logo} alt="logo" className=" h-25 w-25" />
          <div className="">
            <h2 className="text-purple-800 text-4xl font-bold">Welcome !</h2>
            <h5 className="font-bold tracking-wide">
              Explore the ideas throughout <br /> the world.
            </h5>
            <br />
            <h1 className="font-bold underline">Demo Id</h1>
            <h5 className="tracking-wide">Email: novadvani@gmail.com</h5>
            <h5 className="tracking-wide">Password: nova123</h5>
          </div>
        </div>

        {/* Right side */}
        <div className=" rounded-2xl p-5  bg-white">
          <form
            onSubmit={handlSubmit}
            className="flex flex-col items-center justify-center gap-4"
          >
            <h3 className="text-2xl font-bold p-5 text-gray-800 mb-2">Login</h3>

            <div className="flex  w-full">
              <input
                type="text"
                placeholder="Email"
                className="border-none outline-none text-gray-600 bg-gray-200 rounded-lg p-2.5 w-full"
                name="email"
                onChange={changeEventHandler}
                value={input.email}
              />
            </div>
            <div className="flex gap-2 w-full">
              <input
                type="password"
                placeholder="Password"
                className="  border-none outline-none text-gray-600 bg-gray-200 rounded-lg p-2.5 w-full"
                name="password"
                onChange={changeEventHandler}
                value={input.password}
              />
            </div>

            <span
              id="error-msg"
              className="text-red-600 font-bold error-msg pt-2"
            ></span>

            <span className="text-gray-600">
              Don't have an account ?{"  "}
              <Link
                to="/signup"
                className="font-medium text-primary text-blue-500 transition-all duration-200 hover:underline"
              >
                SignUp here
              </Link>
            </span>

            <button className="button" type="submit">
              {" "}
              Login{" "}
            </button>
            {toastMessage && <Toast message={toastMessage} />}
          </form>
        </div>
      </div>    
    </>
  );
}

export default Login;
