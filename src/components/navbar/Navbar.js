import "./Navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../Context/DarkModeContext";
import { AuthContext } from "../../Context/AuthContext";
import { PersianContext } from "../../Context/PersianContext";
import UsaIcon from "../../assets/usa-icon-48.png";
import IrIcon from "../../assets/ir-icon-48.png";

function Navbar() {
  const { toggleDarkMode, darkMode } = useContext(DarkModeContext);
  const { toggleFa, persian } = useContext(PersianContext);
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="left">
        <Link to={"/"} style={{ textDecoration: "none" }}>
          {!persian ? <span>EEgram</span> : <span>ای ایگرام</span>}
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
        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder={!persian? "Search...":"جستجو..."} />
        </div>
      </div>
      <div className="right">
        <div className="person">
          <PersonOutlinedIcon />
        </div>
        <div className="email-icon">
          <EmailOutlinedIcon />
        </div>
        <div className="notif-icon">
          <NotificationsNoneOutlinedIcon />
        </div>
        <div className="user">
          <img src={currentUser.profilePic} alt="avatar" />
          <span>{currentUser.name}</span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
