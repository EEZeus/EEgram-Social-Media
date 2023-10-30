import { useContext } from "react";
import "./Rightbar.scss";
import { AuthContext } from "../../Context/AuthContext";

function Rightbar() {

  const {currentUser} = useContext(AuthContext)
  return (
    <div className="rightbar">
      <div className="container">
        <div className="item">
          <span>Suggestions for You</span>
          <div className="user">
            <div className="userInfo">
              <img
                src={currentUser.profilePic}
                alt=""
              />
              <span>{currentUser.name}</span>
            </div>
            <div className="buttons">
              <button>Follow</button>
              <button>Dismiss</button>
            </div>
          </div>
          <div className="user">
          <div className="userInfo">
              <img
                src={currentUser.profilePic}
                alt=""
              />
              <span>{currentUser.name}</span>
            </div>
            <div className="buttons">
              <button>Follow</button>
              <button>Dismiss</button>
            </div>
          </div>
        </div>
        <div className="item">
          <span>Latest Activities</span>
          <div className="user">
            <div className="userInfo">
              <img
                src={currentUser.profilePic}
                alt=""
              />
              <p>
                <span>{currentUser.name}</span> Changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
          <div className="userInfo">
              <img
                src={currentUser.profilePic}
                alt=""
              />
              <p>
                <span>{currentUser.name}</span> Changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
          <div className="userInfo">
              <img
                src={currentUser.profilePic}
                alt=""
              />
              <p>
                <span>{currentUser.name}</span> Changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="item">
          <span>Online Friends</span>
          <div className="user">
            <div className="userInfo">
              <img
                src={currentUser.profilePic}
                alt=""
              />
              <div className="online" />
              <span>{currentUser.name}</span>
            </div>
          </div>
          <div className="user">
          <div className="userInfo">
              <img
                src={currentUser.profilePic}
                alt=""
              />
              <div className="online" />
              <span>{currentUser.name}</span>
            </div>
          </div>
          <div className="user">
          <div className="userInfo">
              <img
                src={currentUser.profilePic}
                alt=""
              />
              <div className="online" />
              <span>{currentUser.name}</span>
            </div>
          </div>
          <div className="user">
          <div className="userInfo">
              <img
                src={currentUser.profilePic}
                alt=""
              />
              <div className="online" />
              <span>{currentUser.name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rightbar;
