import "./Navbar.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../../Context/DarkModeContext";
import { AuthContext } from "../../Context/AuthContext";
import { PersianContext } from "../../Context/PersianContext";
import UsaIcon from "../../assets/usa-icon-48.png";
import IrIcon from "../../assets/ir-icon-48.png";
import LogoutIcon from "@mui/icons-material/Logout";
import { makeRequest } from "../../axios";
import { getListSubheaderUtilityClass } from "@mui/material";

function Navbar() {
  const { toggleDarkMode, darkMode } = useContext(DarkModeContext);
  const { toggleFa, persian } = useContext(PersianContext);
  const { currentUser,getUser } = useContext(AuthContext);
  const [searchedUsers, setSearchedUsers] = useState([]);


  const handleLogout = async (e) => {
    await makeRequest.post("/auth/logout").then((res) => res.data);
    window.location.reload();
  };

  const handleSearch = async (e) => {
    if (e.target.value) {
      const res = await makeRequest
        .post("/users", { name: e.target.value })
        .then((res) => res.data);
      setSearchedUsers(res);
    } else {
      setSearchedUsers([]);
    }
  };

  return (
    <>
      <div className="navbar">
        <div className="left">
          <NavLink to={"/"} onClick={()=>{
            getUser()
            if(window.location.href === 'http://localhost:3000/')window.location.reload()}}  style={{ textDecoration: "none" }}>
            {!persian ? (
              <span className="eegram">EEgram</span>
            ) : (
              <span className="eegram">ای ایگرام</span>
            )}
          </NavLink>

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
            <SearchOutlinedIcon
              style={{
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
              }}
            />
            <input
              onInput={handleSearch}
              type="text"
              placeholder={!persian ? "Search..." : "جستجو..."}
            />
          </div>
        </div>
        <div className="right">
          <div className="person">
            <LogoutIcon onClick={handleLogout} style={{ cursor: "pointer" }} />
          </div>
          <NavLink
            to={`/profile/${currentUser.id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "5px",
            }}
          >
            <img
              src={
                currentUser.profilePic
                  ? "../../../upload/" + currentUser.profilePic
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png"
              }
              className="profilePic"
              alt=""
            />
            <span onClick={()=>getUser()} className="name">{currentUser.name}</span>
          </NavLink>
          <div className="user"></div>
        </div>
      </div>
      {searchedUsers.length ? (
        <div className="results">
          {searchedUsers.map((user) => (
            <div key={user.id} className="userInfo">
              <img
                src={
                  user.profilePic
                    ? "../../../upload/" + user.profilePic
                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png"
                }
                alt=""
              />
              <div className="details">
                <NavLink
                  to={`/profile/${user.id}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setSearchedUsers([]);
                  }}
                >
                  <span className="name">{user.name}</span>
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
}

export default Navbar;
