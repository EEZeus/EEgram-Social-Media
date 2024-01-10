import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import Post from "../post/Post";
import PostLoading from "../loading/PostLoading";
import "./Posts.scss";

function Posts({ userId }) {
  const { isLoading, error, data } = useQuery({
    queryKey: ["posts",userId],
    queryFn: () =>
      makeRequest.get("/posts?userId=" + userId).then((res) => res.data),
    retry: 2,
  });

  if (isLoading) {
    return <PostLoading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="posts">
      {data && data.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
}

export default Posts;
