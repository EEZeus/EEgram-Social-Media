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
import { PersianContext } from "../../Context/PersianContext";

function Leftbar() {
  const {currentUser} = useContext(AuthContext)
  const {persian} = useContext(PersianContext)
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
            <img src={Friends} alt={!persian?'Friends':'دوستان'} />
            <span>{!persian?'Friends':'دوستان'}</span>
          </div>
          <div className="item">
            <img src={Groups} alt="Groups" />
            <span>{!persian?'Groups':'گروه ها'}</span>
          </div>
          <div className="item">
            <img src={Market} alt="Market" />
            <span>{!persian?'Market':'فروشگاه'}</span>
          </div>
          <div className="item">
            <img src={Watch} alt="Watch" />
            <span>{!persian?'Watch':'تماشا'}</span>
          </div>
          <div className="item">
            <img src={Memories} alt="Memories" />
            <span>{!persian?'Memories':'خاطرات'}</span>
          </div>
        </div>
        <hr/>
        <div className="menu">
            <span>{!persian?'Your Shortcuts':'میانبر ها'}</span>
        <div className="item">
            <img src={Events} alt="Events" />
            <span>{!persian?'Events':'رویداد ها'}</span>
          </div>
          <div className="item">
            <img src={Gaming} alt="Gaming" />
            <span>{!persian?'Gaming':'بازی'}</span>
          </div>
          <div className="item">
            <img src={Gallery} alt="Gallery" />
            <span>{!persian?'Gallery':'گالری'}</span>
          </div>
          <div className="item">
            <img src={Videos} alt="Videos" />
            <span>{!persian?'Videos':'ویدیو ها'}</span>
          </div>
          <div className="item">
            <img src={Messages} alt="Messages" />
            <span>{!persian?'Messages':'پیام ها'}</span>
        </div>
        </div>
        <hr/>
        <div className="menu">
            <span>{!persian?'Others':'دیگر'}</span>
        <div className="item">
            <img src={Tutorials} alt="Tutorials" />
            <span>{!persian?'Tutorials':'آموزش ها'}</span>
          </div>
          <div className="item">
            <img src={Courses} alt="Courses" />
            <span>{!persian?'Courses':'دوره ها'}</span>
          </div>
          <div className="item">
            <img src={Fund} alt="Fund" />
            <span>{!persian?'Fund':'مالی'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leftbar;
