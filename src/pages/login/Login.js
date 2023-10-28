import { Link } from "react-router-dom";
import "./Login.scss";

function Login() {
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>EEgram</h1>
          <p>
            Unlock a world of tailored connections and interactive experiences
            with EEgram. As you embark on your journey through this innovative
            social platform, expect more than just a typical networking site.
          </p>
          <span>Don't you have an account?</span>
          <Link to={'/signup'}>
          <button>Sign up</button>
          </Link>
        </div>
        <div className="right">
          <h1>Log in</h1>
          <form action="">
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button>Log in</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
