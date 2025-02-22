import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./logoSearch.css";
import logoe from "../../Images/logoe.png";
import { useNavigate } from "react-router-dom";

export default function LogoSearch() {

  const navigate = useNavigate()
  return (
    <div className="LogoSearch">
      <img onClick={()=>navigate('/homepage')} src={logoe} alt="logo" className="h-10 w-10 cursor-pointer" />

      <div className="Search">
        <input type="text" placeholder="#Explore" />

        <div className="s-icon">
          <SearchIcon />
        </div>
      </div>
    </div>
  );
}
