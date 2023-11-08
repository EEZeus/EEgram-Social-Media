import "./Post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import {PersianContext} from '../../Context/PersianContext'
import { useContext, useState } from "react";
import Comments from '../comments/Comments';
import { NavLink } from "react-router-dom";

function Post({ post }) {
  const [commentActive, setCommentActive] = useState(false);
  const {persian} = useContext(PersianContext)
  //temporary logic

  const liked = false;

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.profilePic} alt="profilePic" />
            <div className="details">
              <NavLink
                to={`/profile/${post.userId}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  cursor: "pointer",
                }}
              >
                <span className="name">{post.name}</span>
              </NavLink>
              <span className="date">{!persian? '1 min ago':'1 دقیقه پیش'}</span>
            </div>
          </div>
          <MoreHorizOutlinedIcon />
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={post.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {!liked ? <FavoriteBorderOutlinedIcon /> : <FavoriteOutlinedIcon />}
            {!persian? '12 likes':'12 پسند'}
          </div>
          <div
            className="item"
            onClick={() => setCommentActive(!commentActive)}
          >
            <TextsmsOutlinedIcon />
            {!persian? '12 comments':'12 نظر'}
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            {!persian? 'Share':'اشتراک گذاری'}
          </div>
        </div>
        {commentActive ? <Comments /> : null}
      </div>
    </div>
  );
}

export default Post;
