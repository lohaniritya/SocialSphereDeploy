import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NotFound = () => {
  const { userData } = useSelector((state) => state.user);
  return (
    <div className="bg-gradient-to-r from-indigo-50 to-sky-100 min-h-screen px-4 py-8 flex flex-col justify-center items-center">
      <div className="max-w-md mx-auto grid grid-flow-row text-center gap-4">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-800 tracking-wide">
          404
        </h1>
        <p className="text-xl md:text-2xl font-medium text-gray-600 mt-4">
          Page Not Found
        </p>
        <p className="text-gray-500">
          Oops! The page you're looking for doesn't exist. It might have been
          moved, deleted, or never existed.
        </p>
        <div className="flex justify-center">
          {userData ? (
            <Link to="/homepage" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-indigo-600 hover:to-blue-600 text-white font-bold no-underline px-4 py-2 rounded transition duration-300">Go to Dashboard</Link>
          ) : (
            <Link to="/login" className="bg-purple-500 hover:from-indigo-600 hover:to-blue-600 text-white font-bold no-underline px-4 py-2 rounded transition duration-300">Login</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
