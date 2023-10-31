import Stories from '../../components/stories/Stories';
import Posts from '../../components/posts/Posts';

import './Home.scss'

function Home(){
    return(
        <div className = 'home'>
          <Stories/>
          <Posts/>
        </div>
    )
}

export default Home;