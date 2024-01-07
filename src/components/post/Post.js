import "./Post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { PersianContext } from "../../Context/PersianContext";
import { useContext, useState } from "react";
import Comments from "../comments/Comments";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../Context/AuthContext";
import { fabClasses } from "@mui/material";

function Post({ post }) {
  const [commentActive, setCommentActive] = useState(false);
  const [menuOpen,setMenuOpen] = useState(false)
  const { persian } = useContext(PersianContext);
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery({
    queryKey: ["likes", post.id],
    queryFn: () =>
      makeRequest.get("/likes?postId=" + post.id).then((res) => res.data),
  });

  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: (liked) => {
      if(liked) return makeRequest.delete("/likes?postId="+post.id);
      return makeRequest.post('/likes',{postId:post.id})
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["likes"]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (postId) => {
      return makeRequest.delete('/posts/'+postId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

    const handleLike = () => {
      if (!data) {
        console.log("Likes data is not available yet.");
        return;
      }

    if (!mutation.isLoading && data) {
      mutation.mutate(data.includes(currentUser.id));
    }
  };

  const handleDelete = ()=>{
    deleteMutation.mutate(post.id)
  }


  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={"../../../upload/" + post.profilePic} alt="" />
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
              <span className="date">
                {!persian
                  ? moment(post.createdAt).fromNow()
                  : moment(post.createdAt)
                      .fromNow()
                      .replace("minutes", "دقیقه")
                      .replace("minute", "دقیقه")
                      .replace("seconds", "ثانیه")
                      .replace("second", "ثانیه")
                      .replace("a few", "چند")
                      .replace("ago", "پیش")
                      .replace("an", "یک")
                      .replace("a", "یک")
                      .replace("day", "روز")
                      .replace("days", "روز")
                      .replace("hour", "ساعت")
                      .replace("hours", "ساعت")}
              </span>
            </div>
          </div>
          <div className="drop">
          {post.userId === currentUser.id && <MoreHorizOutlinedIcon onClick={()=>setMenuOpen(!menuOpen)} />}
          {menuOpen && <button onClick={handleDelete}>Delete</button>}
          </div>
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={"../../../upload/" + post.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
          {!isLoading ? (
            <>
              {data && !data.includes(+currentUser.id) ? (
                <FavoriteBorderOutlinedIcon onClick={handleLike} />
              ) : (
                <FavoriteOutlinedIcon
                  style={{ color: "red" }}
                  onClick={handleLike}
                />
              )}
              {!persian ? `${data.length} Likes` : `${data.length} پسند`}
            </>
          ) : (
            'Loading ...'
          )}
          </div>
          <div
            className="item"
            onClick={() => setCommentActive(!commentActive)}
          >
            <TextsmsOutlinedIcon />
            {!persian ? "12 comments" : "12 نظر"}
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            {!persian ? "Share" : "اشتراک گذاری"}
          </div>
        </div>
        {commentActive ? <Comments postId={post.id} /> : null}
      </div>
    </div>
  );
}
export default Post;
