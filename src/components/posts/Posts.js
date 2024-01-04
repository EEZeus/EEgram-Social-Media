import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import Post from "../post/Post";
import "./Posts.scss";

function Posts() {


  const { isLoading, error, data } = useQuery('posts', () =>
    makeRequest.get('/posts').then(res =>{
      return res.data
    })
)

  return (
    <div className="posts">
      {data.map((post) => (
        <Post post={post} key={post.id}/>
      ))}
    </div>
  );
}

export default Posts;
