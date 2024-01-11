import "./Post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { PersianContext } from "../../Context/PersianContext";
import { useContext, useState } from "react";
import Comments from "../comments/Comments";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../Context/AuthContext";
import Loading from "../loading/Loading";
import PostLoading from "../loading/PostLoading";

function Post({ post }) {
  const [commentActive, setCommentActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { persian } = useContext(PersianContext);
  const { currentUser } = useContext(AuthContext);
  const [translatedText, setTranslatedText] = useState("");

  const { isLoading, error, data } = useQuery({
    queryKey: ["likes", post.id],
    queryFn: () =>
      makeRequest.get("/likes?postId=" + post.id).then((res) => res.data),
  });

  const {
    isLoading: cIsLoading,
    error: cError,
    data: cData,
  } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () =>
      makeRequest.get("/comments?postId=" + post.id).then((res) => res.data),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (liked) => {
      if (liked) return makeRequest.delete("/likes?postId=" + post.id);
      return makeRequest.post("/likes", { postId: post.id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["likes"]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (postId) => {
      return makeRequest.delete("/posts/" + postId);
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

  const handleDelete = () => {
    deleteMutation.mutate(post.id);
  };

  const handleTranslate = async (e) => {
    if(translatedText === ''){
    try {
      setTranslatedText(<PostLoading/>);
      const res = await makeRequest.post("/translate", { desc: post.desc });
      setTranslatedText(<p>{res.data}</p>);
    } catch (err) {
      setTranslatedText('Sorry, Translation failed. Please check your network.');
    }
  } else{
    setTranslatedText('')
  }
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img
              src={
                post.profilePic
                  ? "../../../upload/" + post.profilePic
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png"
              }
              alt=""
            />
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
                      .replace("days", "روز")
                      .replace("day", "روز")
                      .replace("hours", "ساعت")
                      .replace("hour", "ساعت")}
              </span>
            </div>
          </div>
          <div className="drop">
            {post.userId === currentUser.id && (
              <MoreHorizOutlinedIcon onClick={() => setMenuOpen(!menuOpen)} />
            )}
            {menuOpen && <button onClick={handleDelete}>Delete</button>}
          </div>
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <span
            style={{ cursor: "pointer", color: "blue", fontSize: "14px" }}
            onClick={handleTranslate}
          >
            translate...
          </span>
          {translatedText? <div style={{marginBlock:'5px',paddingLeft:'10px'}}>{translatedText}</div>: null}
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
              <Loading />
            )}
          </div>
          <div
            className="item"
            onClick={() => setCommentActive(!commentActive)}
          >
            <TextsmsOutlinedIcon />
            {cIsLoading ? (
              <Loading />
            ) : !persian ? (
              `${cData.length} comments`
            ) : (
              `${cData.length} نظر`
            )}
          </div>
        </div>
        {commentActive ? <Comments postId={post.id} /> : null}
      </div>
    </div>
  );
}
export default Post;
