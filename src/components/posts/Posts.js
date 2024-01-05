import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import Post from "../post/Post";
import "./Posts.scss";

function Posts() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['posts'],
    queryFn: () => makeRequest.get('/posts').then(res => res.data),
  });

  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="posts">
      {data && data.map(post => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
}


export default Posts;
