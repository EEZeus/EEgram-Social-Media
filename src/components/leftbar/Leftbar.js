import "./Leftbar.scss";
import Friends from "../../assets/friends.png";
import Groups from "../../assets/group.png";
import Market from "../../assets/market.png";
import Watch from "../../assets/multimedia.png";
import Memories from "../../assets/pictures.png";
import Events from "../../assets/event.png";
import Gaming from "../../assets/joystick.png";
import Gallery from "../../assets/picture.png";
import Videos from "../../assets/youtube.png";
import Messages from "../../assets/messages.png";
import Tutorials from "../../assets/educational-video.png";
import Courses from "../../assets/webinar.png";
import Fund from "../../assets/saving.png";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

function Leftbar() {
  const {currentUser} = useContext(AuthContext)
  return (
    <div className="leftbar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img
              src=
              {currentUser.profilePic} alt="avatar"
            />
            <span>{currentUser.name}</span>
          </div>
          <div className="item">
            <img src={Friends} alt="Friends" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={Groups} alt="Groups" />
            <span>Groups</span>
          </div>
          <div className="item">
            <img src={Market} alt="Market" />
            <span>Market</span>
          </div>
          <div className="item">
            <img src={Watch} alt="Watch" />
            <span>Watch</span>
          </div>
          <div className="item">
            <img src={Memories} alt="Memories" />
            <span>Memories</span>
          </div>
        </div>
        <hr/>
        <div className="menu">
            <span>Your shortcuts</span>
        <div className="item">
            <img src={Events} alt="Events" />
            <span>Events</span>
          </div>
          <div className="item">
            <img src={Gaming} alt="Gaming" />
            <span>Gaming</span>
          </div>
          <div className="item">
            <img src={Gallery} alt="Gallery" />
            <span>Gallery</span>
          </div>
          <div className="item">
            <img src={Videos} alt="Videos" />
            <span>Videos</span>
          </div>
          <div className="item">
            <img src={Messages} alt="Messages" />
            <span>Messages</span>
        </div>
        </div>
        <hr/>
        <div className="menu">
            <span>Others</span>
        <div className="item">
            <img src={Tutorials} alt="Tutorials" />
            <span>Tutorials</span>
          </div>
          <div className="item">
            <img src={Courses} alt="Courses" />
            <span>Courses</span>
          </div>
          <div className="item">
            <img src={Fund} alt="Fund" />
            <span>Fund</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leftbar;
