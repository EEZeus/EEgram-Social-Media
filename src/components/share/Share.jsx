import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { PersianContext } from "../../Context/PersianContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Share = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const [isLoading, setIsLoading] = useState(false); // New loading state

  const upload = async () => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("file", file);
     
      const res = await makeRequest.post("/upload", formData);

      return res.data;
    } catch (err) {
      if (err.code === "ECONNABORTED") {
        console.log("Request aborted: The upload took too long.");
      } else {
        console.error(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const { currentUser } = useContext(AuthContext);
  const { persian } = useContext(PersianContext);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newPost) => {
      return makeRequest.post("/posts", newPost);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) {
      imgUrl = await upload();
    }

      mutation.mutate({ desc, img: imgUrl });

    setDesc('')
    setFile(null)
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img src={currentUser.profilePic?"../../../upload/"+currentUser.profilePic:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png'} alt="" />
            <input
              type="text"
              placeholder={
                !persian
                  ? `What's on your mind ${currentUser.name}?`
                  : `چی توی ذهنته ${currentUser.name}؟`
              }
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className="right">
            {file && <img className="file" alt="" src={URL.createObjectURL(file)}/>}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>{!persian ? `Add Image` : `اضافه کردن عکس`}</span>
              </div>
            </label>
          </div>
          <div className="right">
            <button onClick={handleClick}>
              {!persian ? `Share` : `اشتراک گذاری`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
