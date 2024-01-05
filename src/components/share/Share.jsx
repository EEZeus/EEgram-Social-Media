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

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post('/upload',formData)
      console.log(res.data)
      return res.data
    } catch (err) {
      console.log(err);
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
      // Invalidate and refetch
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = '';
    if(file) imgUrl = await upload();
   mutation.mutate({ desc,img:imgUrl });
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img src={currentUser.profilePic} alt="" />
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
            <div className="item">
              <img src={Map} alt="" />
              <span>{!persian ? `Add Place` : `اضافه کردن مکان`}</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>{!persian ? `Tag Friends` : `تگ کردن دوستان`}</span>
            </div>
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
