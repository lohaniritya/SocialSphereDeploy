import React ,{useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./logoSearch.css";
import logoe from "../../Images/logoe.png";
import avatar from "../../Images/avatar.png"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function LogoSearch() {

  const {allUsers} = useSelector(state=>state.user)
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (event) => {
    const term = event.target.value;
    if(term === ""){
      setSearchTerm(term);
      setSearchResults([])
    }else{
      setSearchTerm(term);

    const results = allUsers.filter((user) =>
      (user.firstName.toLowerCase().includes(term.toLowerCase()) || 
      user.lastName.toLowerCase().includes(term.toLowerCase()))
    );
    setSearchResults(results);
    }
  };


  const navigate = useNavigate()
  return (
    <>
    <div className="logodiv flex flex-col">
      <div className="LogoSearch">
      <img onClick={()=>navigate('/homepage')} src={logoe} alt="logo" className="h-10 w-10 cursor-pointer" />
      <h1 className="font-extrabold bg-gradient-to-r from-sky-700 to-purple-600 bg-clip-text text-transparent text-2xl pt-1 hidden">Social Sphere</h1>
      <div className="Search">
        <input type="text" placeholder="#Explore" value={searchTerm} onChange={handleSearch} />

        <div className="s-icon">
          <SearchIcon />
        </div>
      </div>
      </div>
    
      {searchResults.length > 0 && (
    <div className="searchdiv">
      <ul className="flex flex-col gap-1.5">
        {searchResults.map((user) => (
          
          <li ><div key={user.id} className="flex gap-3 items-center pb-1">
            <img src={user.profileImage || avatar} className="h-8 w-8 rounded-2xl bg-gray-300" alt="" />
            {user.firstName} {user.lastName}
            </div></li>
        ))}
      </ul>
    </div>
    )}
    </div>

    </>

  );
}
