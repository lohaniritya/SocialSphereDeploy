import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import SignUp from "./pages/signup/SignUp";
import Login from "./pages/login/Login";
import HomePage from "./pages/dashboard/HomePage";
import NotFound from "./pages/not found/NotFound";
import Profile from "./pages/myProfile/Profile";
import "./index.css";

function App() {

  return (
    <>
      <div className="App">
        <div className="blur b1" style={{ top: "-18%", right: "0" }}></div>
        <div className="blur b2" style={{ top: "36%", left: "-8rem" }}></div>
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