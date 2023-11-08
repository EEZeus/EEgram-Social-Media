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

function Profile() {
  const { persian } = useContext(PersianContext);
  return (
    <div className="profile">
      <div className="images">
        <img
          className="cover"
          src="https://images.pexels.com/photos/268941/pexels-photo-268941.jpeg?cs=srgb&dl=pexels-pixabay-268941.jpg&fm=jpg"
          alt=""
        />
        <img
          className="profilePic"
          src="https://images.pexels.com/photos/15422042/pexels-photo-15422042.jpeg?cs=srgb&dl=pexels-aghashukur-mammadli-15422042.jpg&fm=jpg"
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
            <span>Ehsan Espandar</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>Kurdistan</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>EEgram.dev</span>
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
