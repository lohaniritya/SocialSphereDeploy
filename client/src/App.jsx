import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import SignUp from "./pages/signup/SignUp.jsx";
import Login from "./pages/login/Login.jsx";
import HomePage from "./pages/dashboard/HomePage.jsx";
import NotFound from "./pages/not found/NotFound.jsx";
import Profile from "./pages/myProfile/Profile.jsx";
import "./index.css";

function App() {

  return (
    <>
      <div className="App">
        <div className="blur b1" style={{ top: "-18%", right: "0" }}></div>
        <div className="blur b2" style={{ top: "66%", left: "-8rem" }}></div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/signup" replace />} /> 
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} /> 
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;