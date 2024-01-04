import "./Profile.scss";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import { useContext } from "react";
import { PersianContext } from "../../Context/PersianContext";
import { AuthContext } from "../../Context/AuthContext";

function Profile() {
  const { persian } = useContext(PersianContext);
  const {currentUser} = useContext(AuthContext)
  return (
    <div className="profile">
      <div className="images">
        <img
          className="cover"
          src={currentUser.coverPic}
          alt=""
        />
        <img
          className="profilePic"
          src={currentUser.profilePic}
          alt=""
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://www.facebook.com">
              <FacebookOutlinedIcon fontSize="large" />
            </a>
            <a href="http://www.instagram.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://www.twitter.com">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="http://www.linkedin.com">
              <LinkedInIcon fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span>{currentUser.name}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>{currentUser.city}</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>{currentUser.website}</span>
              </div>
            </div>
            <button>{!persian ? "Follow" : "دنبال کردن"}</button>
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
        <Posts />
      </div>
    </div>
  );
}

export default Profile;
