import { Link, useNavigate } from 'react-router-dom';
import './Signup.scss'
import { useState } from 'react';
import axios from 'axios'
import Swal from 'sweetalert2'
function Signup() {
  const navigate = useNavigate()
  const[inputs,setInputs] = useState(
    {
      username:'',
      email:'',
      password:'',
      name:'',
    }
  )
  const[err,setErr] = useState(null)

  const handleChange = e =>{
    setInputs((prev)=>({...prev,[e.target.name]:e.target.value}))
  }

  const handleClick = async (e) =>{
    if(inputs.username.length>=5){
      if(inputs.name.length>5){
        if(inputs.email.includes('@')){
          if(inputs.password.length>5){
          e.preventDefault()
          try{
            console.log(inputs)
            await axios.post('http://localhost:8800/server/auth/signup',inputs)
            Swal.fire({
              title: 'Congratulations!',
              text: 'You have Successfully signed up .',
              icon: 'success',
              confirmButtonText: 'OK',
            });
            navigate('/login')
          }
          catch(err){
            setErr(err.response.data)
            
          }
        }else{
          setErr('Password must be at least 6 characters !')
        }
        }else{
          setErr('Email is not in correct format !')
        }
  }else{
    setErr('Name must be at least 6 characters !')
  }
  }else{
    setErr('Username must be at least 5 characters !')
  }
  }
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
            <form>
              <input type="text" placeholder="Username" name='username' onChange={handleChange} minLength={5} required />
              <input type="text" placeholder="Name" name='name' onChange={handleChange} minLength={6} required/>
              <input type="email" placeholder="Email" name='email' onChange={handleChange} required/>
              <input type="password" placeholder="Password" name='password' onChange={handleChange} minLength={6} required/>
             {err && <div style={{color:'red',fontSize:'14px'}}>{err}</div>}
              <button type='submit' onClick={handleClick}>Sign up</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

export default Signup;