import { useContext } from 'react';
import './Comments.scss'
import { AuthContext } from '../../Context/AuthContext';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
const Comments = () => {

    const {currentUser} = useContext(AuthContext)

    //temp comments

    const comments = [
        {
          id: 1,
          name: "Ehsan Espandar",
          userId: 1,
          profilePic:
            "https://images.pexels.com/photos/4553618/pexels-photo-4553618.jpeg?cs=srgb&dl=pexels-roman-odintsov-4553618.jpg&fm=jpg",
          desc: "This is a test comment from some user, don't mind about it.",
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
    <div className='comments'>
        <div className='write'>
            <img src={currentUser.profilePic} alt=''/>
            <input type='text' placeholder='Leave a comment ...'/>
            <button><SendOutlinedIcon/></button>
        </div>
        {comments.map(comment => (
            <div className='comment' key={comment.id}>
                <img src={comment.profilePic} alt='' />
                <div className='info'>
                    <span>{comment.name}</span>
                    <p>{comment.desc}</p>
                </div>
                <span className='date'>1 hour ago</span>
            </div>
        ))}
    </div>
  )
}

export default Comments