import { useContext } from "react";
import "./Rightbar.scss";
import { AuthContext } from "../../Context/AuthContext";
import { PersianContext } from "../../Context/PersianContext";

function Rightbar() {
  const { currentUser } = useContext(AuthContext);
  const { persian } = useContext(PersianContext);
  return (
    <div className="rightbar">
      <div className="container">
        <div className="item">
          <span>{!persian ? "Suggestions For You" : "پیشنهادی برای شما"}</span>
          <div className="user">
            <div className="userInfo">
              <img src={currentUser.profilePic} alt="" />
              <span>{currentUser.name}</span>
            </div>
            <div className="buttons">
              <button style={persian ? { height: "40px" } : null}>
                {!persian ? "Follow" : "دنبال کردن"}
              </button>
              <button style={persian ? { height: "40px" } : null}>
                {!persian ? "Dismiss" : "رد کردن"}
              </button>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={currentUser.profilePic} alt="" />
              <span>{currentUser.name}</span>
            </div>
            <div className="buttons">
              <button style={persian ? { height: "40px" } : null}>
                {!persian ? "Follow" : "دنبال کردن"}
              </button>
              <button style={persian ? { height: "40px" } : null}>
                {!persian ? "Dismiss" : "رد کردن"}
              </button>
            </div>
          </div>
        </div>
        <div className="item">
          <span>{!persian ? "Latest Activities" : " فعالیت های اخیر "}</span>
          <div className="user">
            <div className="userInfo">
              <img src={currentUser.profilePic} alt="" />
              <p>
                <span>{currentUser.name}</span>{" "}
                {!persian ? "Changed their cover name" : "نام کاورش را عوض کرد"}
              </p>
            </div>
            <span>{!persian ? "1 min ago" : "1 دقیقه پیش"}</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={currentUser.profilePic} alt="" />
              <p>
                <span>{currentUser.name}</span>{" "}
                {!persian ? "Changed their cover name" : "نام کاورش را عوض کرد"}
              </p>
            </div>
            <span>{!persian ? "1 min ago" : "1 دقیقه پیش"}</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={currentUser.profilePic} alt="" />
              <p>
                <span>{currentUser.name}</span>{" "}
                {!persian ? "Changed their cover name" : "نام کاورش را عوض کرد"}
              </p>
            </div>
            <span>{!persian ? "1 min ago" : "1 دقیقه پیش"}</span>
          </div>
        </div>
        <div className="item">
          <span>{!persian ? "Online Friends" : "دوستان آنلاین"}</span>
          <div className="user">
            <div className="userInfo">
              <img src={currentUser.profilePic} alt="" />
              <div
                className="online"
                style={persian ? { top: "0", right: "30px" } : null}
              />
              <span>{currentUser.name}</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={currentUser.profilePic} alt="" />
              <div
                className="online"
                style={persian ? { top: "0", right: "30px" } : null}
              />
              <span>{currentUser.name}</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={currentUser.profilePic} alt="" />
              <div
                className="online"
                style={persian ? { top: "0", right: "30px" } : null}
              />
              <span>{currentUser.name}</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={currentUser.profilePic} alt="" />
              <div
                className="online"
                style={persian ? { top: "0", right: "30px" } : null}
              />
              <span>{currentUser.name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rightbar;
