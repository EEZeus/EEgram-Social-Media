import { useContext, useState } from "react";
import "./Comments.scss";
import { AuthContext } from "../../Context/AuthContext";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { PersianContext } from "../../Context/PersianContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";
import PostLoading from "../loading/PostLoading";
const Comments = ({ postId }) => {
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { persian } = useContext(PersianContext);

  const { isLoading, error, data } = useQuery({
    queryKey: ["comments"],
    queryFn: () =>
      makeRequest.get("/comments?postId=" + postId).then((res) => res.data),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    },
  });

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ desc, postId });

    setDesc("");
  };

  return (
    <div className="comments">
      <div className="write">
        <img
          src={
            currentUser.profilePic
              ? "../../../upload/" + currentUser.profilePic
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png"
          }
          alt=""
        />
        <input
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
          type="text"
          placeholder={!persian ? "Leave a comment..." : "نظری بنویس..."}
        />
        <button onClick={handleClick}>
          <SendOutlinedIcon />
        </button>
      </div>
      {isLoading ? (
        <PostLoading />
      ) : (
        data.map((comment) => (
          <div className="comment" key={comment.id}>
            <img
              src={
                currentUser.profilePic
                  ? "../../../upload/" + currentUser.profilePic
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png"
              }
              alt=""
            />
            <div className="info">
              <span>{comment.name}</span>
              <p>{comment.desc}</p>
            </div>
            <span className="date">
              {!persian
                ? moment(comment.createdAt).fromNow()
                : moment(comment.createdAt)
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
        ))
      )}
    </div>
  );
};

export default Comments;
