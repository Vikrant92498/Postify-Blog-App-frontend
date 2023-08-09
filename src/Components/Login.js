import React, { useState } from 'react';
import '../css/Login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [logging,setLogging]=useState(false);
  const handleSubmit = (e) => {
    if(e) e.preventDefault();
    setLogging(true);
    const loginDetails = {
        email,
        password
    }
    // Perform validation or submit logic 
    axios.post('https://postify-kkr9.onrender.com/api/auth/login',loginDetails,{
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res=>{
        //const data = res.json();
        console.log(res)
        localStorage.setItem("token", res.data.token);
        const userDataJSON = JSON.stringify(res.data.user);
        localStorage.setItem("user_data", userDataJSON);
        setLogging(false);
        navigate("/", { replace: true });
        window.location.reload();
    }).catch(err=>{
        console.log(err);
        setLogging(false);
    })
  };
  const handleClick = ()=>{
    navigate('/register')
  }
   
  if (logging) {
    return <div className='loading-blog'>Logging In Please Wait</div>;
  }
  return ( 
    <div className="login-container">
      
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="btn-container">
        <button type="submit" className='btn' >Submit</button>
        </div>
        <span>Not registered yet?<a onClick={handleClick} style={{cursor:'pointer',color:'#00f1ff'}}>Register</a></span>
        
      </form>
    </div>
  );
};

export default Login;
