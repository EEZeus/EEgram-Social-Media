import Post from "../post/Post";
import "./Posts.scss";

function Posts() {
  //Temporary data

  const posts = [
    {
      id: 1,
      name: "Ehsan Espandar",
      userId: 1,
      profilePic:
        "https://images.pexels.com/photos/4553618/pexels-photo-4553618.jpeg?cs=srgb&dl=pexels-roman-odintsov-4553618.jpg&fm=jpg",
      desc: "This is a sample post with fake data. please attention that this post will be rendered with user data in future.",
      img: "https://images.pexels.com/photos/4553618/pexels-photo-4553618.jpeg?cs=srgb&dl=pexels-roman-odintsov-4553618.jpg&fm=jpg",
    },
    {
      id: 2,
      name: "Morteza Halim",
      userId: 2,
      profilePic:
        "https://images.pexels.com/photos/4553618/pexels-photo-4553618.jpeg?cs=srgb&dl=pexels-roman-odintsov-4553618.jpg&fm=jpg",
      desc: "This is a sample post with fake data. please attention that this post will be rendered with user data in future.",
    },
  ];

  return (
    <div className="posts">
      {posts.map((post) => (
        <Post post={post} key={post.id}/>
      ))}
    </div>
  );
}

export default Posts;
