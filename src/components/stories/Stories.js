import { useContext } from "react";
import "./Stories.scss";
import { AuthContext } from "../../Context/AuthContext";

function Stories() {
  // Temporary data

  const {currentUser} = useContext(AuthContext)

  const stories = [
    {
      id: 1,
      username:'Ehsan Espandar',
      img: "https://images.pexels.com/photos/4926677/pexels-photo-4926677.jpeg?cs=srgb&dl=pexels-anna-tarazevich-4926677.jpg&fm=jpg",
    },
    {
      id: 2,
      username:'Morteza Halim',
      img: "https://images.pexels.com/photos/5553094/pexels-photo-5553094.jpeg?cs=srgb&dl=pexels-armin-rimoldi-5553094.jpg&fm=jpg",
    },
    {
      id: 3,
      username:'Mahdi Asadollahzadeh',
      img: "https://images.pexels.com/photos/7169353/pexels-photo-7169353.jpeg?cs=srgb&dl=pexels-eren-li-7169353.jpg&fm=jpg",
    },
    {
      id: 4,
      username:'Pouya Jafari',
      img: "https://images.pexels.com/photos/4553618/pexels-photo-4553618.jpeg?cs=srgb&dl=pexels-roman-odintsov-4553618.jpg&fm=jpg",
    },
  ];

  return <div className="stories">
    <div className="story">
            <img src={currentUser.profilePic} alt='story'/>
            <span>{currentUser.name}</span>
            <button>+</button>
        </div>
    {stories.map(story=>(
        <div className="story" key={story.id}>
            <img src={story.img} alt='story'/>
            <span>{story.username}</span>
        </div>
    ))}
  </div>;
}

export default Stories;
