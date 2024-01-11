import { useContext, useEffect, useRef, useState } from "react";
import "./Chat.scss";
import { AuthContext } from "../../Context/AuthContext";
import { makeRequest } from "../../axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { PersianContext } from "../../Context/PersianContext";
import PostLoading from "../loading/PostLoading";

const Chat = ({ setOpenChat, receiver }) => {
  const { currentUser } = useContext(AuthContext);
  const { persian } = useContext(PersianContext);
  const [message, setMessage] = useState("");
  const chatContainerRef = useRef();

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages", currentUser.id, receiver.id],
    queryFn: () =>
      makeRequest
        .post("/messages", {
          senderId: currentUser.id,
          receiverId: receiver.id,
        })
        .then((res) => res.data),
    refetchInterval: 2000,
  });

  useEffect(() => {
    // Scroll to the bottom when the data changes
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [data]);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newMessage) => {
      return makeRequest.post("/messages/send", newMessage);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });

  const handleSend = async (e) => {
    e.preventDefault();
    mutation.mutate({
      senderId: currentUser.id,
      receiverId: receiver.id,
      message: message,
    });
    setMessage("");
  };

  return (
    <div className="chatbg">
      <section className="msger">
        <header className="msger-header">
          <div className="msger-header-title">
            <i className="fas fa-comment-alt"></i>
            {!persian ? "Chat" : "گفت و گو"}
          </div>
          <div className="msger-header-options">
            <button
              onClick={() => setOpenChat(false)}
              style={{
                width: "50px",
                color: "white",
                backgroundColor: "red",
                border: "none",
                borderRadius: "5px",
                height: "30px",
              }}
            >
              {!persian ? "Close" : "بستن"}
            </button>
          </div>
        </header>

        <main  ref={chatContainerRef}  className="msger-chat">
          {!isLoading ? (
            data &&
            data.map((msg) => (
              <div
                key={msg.id}
                className={`msg ${
                  +msg.senderId === +currentUser.id ? "left-msg" : "right-msg"
                }`}
              >
                <img
                  style={{ border: "1px solid grey" }}
                  className="msg-img"
                  src={
                    msg.senderId === currentUser.id
                      ? "../../../upload/" + currentUser.profilePic
                      : "../../../upload/" + receiver.profilePic
                  }
                  alt=""
                />

                <div className="msg-bubble">
                  <div className="msg-info">
                    <div className="msg-info-name">
                      {msg.senderId === currentUser.id
                        ? currentUser.name
                        : receiver.name}
                    </div>
                    <div className="msg-info-time">
                      {!persian
                        ? moment(msg.createdAt).fromNow()
                        : moment(msg.createdAt)
                            .fromNow()
                            .replace("minutes", "دقیقه")
                            .replace("seconds", "ثانیه")
                            .replace("minute", "دقیقه")
                            .replace("second", "ثانیه")
                            .replace("a few", "چند")
                            .replace("ago", "پیش")
                            .replace("an", "یک")
                            .replace("a", "یک")
                            .replace("days", "روز")
                            .replace("day", "روز")
                            .replace("hours", "ساعت")
                            .replace("hour", "ساعت")}
                    </div>
                  </div>

                  <div className="msg-text">{msg.message}</div>
                </div>
              </div>
            ))
          ) : (
            <PostLoading />
          )}
        </main>

        <form className="msger-inputarea">
          <input
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            type="text"
            className="msger-input"
            placeholder={!persian ? "Leave a message..." : "پیامی بگذارید..."}
          />
          <button onClick={handleSend} className="msger-send-btn">
            {!persian ? "Send" : "ارسال"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default Chat;
