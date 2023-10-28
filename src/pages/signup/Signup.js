import { Link } from 'react-router-dom';
import './Signup.scss'

function Signup() {
    return (
      <div className="signup">
        <div className="card">
          <div className="left">
            <h1>EEgram</h1>
            <p>
              Unlock a world of tailored connections and interactive experiences
              with EEgram. As you embark on your journey through this innovative
              social platform, expect more than just a typical networking site.
            </p>
            <span>Do you have an account?</span>
            <Link to={'/login'}>
            <button>Log in</button>
            </Link>
          </div>
          <div className="right">
            <h1>Sign up</h1>
            <form action="">
              <input type="text" placeholder="Username" />
              <input type="text" placeholder="Name" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button>Sign up</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

export default Signup;