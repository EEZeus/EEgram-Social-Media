import "./Navbar.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../Context/DarkModeContext";
import { AuthContext } from "../../Context/AuthContext";
import { PersianContext } from "../../Context/PersianContext";
import UsaIcon from "../../assets/usa-icon-48.png";
import IrIcon from "../../assets/ir-icon-48.png";
import LogoutIcon from '@mui/icons-material/Logout';import { makeRequest } from "../../axios";



function Navbar() {

  
  const { toggleDarkMode, darkMode } = useContext(DarkModeContext);
  const { toggleFa, persian } = useContext(PersianContext);
  const { currentUser } = useContext(AuthContext);

  const handleLogout = async (e) =>{
      await makeRequest.post('/auth/logout').then(res => res.data);
      window.location.reload()
  }

  return (
    <div className="navbar">
      <div className="left">
        <Link to={"/"} style={{ textDecoration: "none" }}>
          {!persian ? <span className="eegram">EEgram</span> : <span className="eegram">ای ایگرام</span>}
        </Link>

        {persian ? (
          <img
            src={IrIcon}
            style={{ cursor: "pointer" }}
            alt="FA"
            onClick={() => toggleFa()}
          />
        ) : (
          <img
            src={UsaIcon}
            alt="EN"
            onClick={() => toggleFa()}
            style={{ cursor: "pointer" }}
          />
        )}

        {!darkMode ? (
          <DarkModeOutlinedIcon
            style={{ cursor: "pointer" }}
            onClick={() => toggleDarkMode()}
          />
        ) : (
          <WbSunnyOutlinedIcon
            onClick={() => toggleDarkMode()}
            style={{ cursor: "pointer" }}
          />
        )}
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder={!persian? "Search...":"جستجو..."} />
        </div>
      </div>
      <div className="right">
        <div className="person">
          <LogoutIcon onClick={handleLogout} style={{cursor:'pointer'}} />
        </div>
        <NavLink
                to={`/profile/${currentUser.id}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  cursor: "pointer",
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'space-between',
                  gap:'5px'
                }}
              >
                  <img src={currentUser.profilePic?'../../../upload/'+currentUser.profilePic:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png'}className="profilePic" alt="" />
              <span className="name">{currentUser.name}</span>
                </NavLink><div className="user">
        
        </div>
      </div>
    </div>
  );
}

export default Navbar;
