import { Link } from 'react-router-dom';
import './Signup.scss'
import { useState } from 'react';
import axios from 'axios'
function Signup() {

  const[inputs,setInputs] = useState(
    {
      username:'',
      email:'',
      password:'',
      name:''
    }
  )
  const[err,setErr] = useState(null)

  const handleChange = e =>{
    setInputs((prev)=>({...prev,[e.target.name]:e.target.value}))
  }

  const handleClick = async e =>{
    e.preventDefault()
    try{
      await axios.post('http://localhost:8800/server/auth/signup',inputs)
    }
    catch(err){
      setErr(err.response.data)
      
    }
  }
  console.log(err)

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
              <input type="text" placeholder="Username" name='username' onChange={handleChange} />
              <input type="text" placeholder="Name" name='name' onChange={handleChange} />
              <input type="email" placeholder="Email" name='email' onChange={handleChange} />
              <input type="password" placeholder="Password" name='password' onChange={handleChange} />
             {err && err}
              <button onClick={handleClick}>Sign up</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

export default Signup;