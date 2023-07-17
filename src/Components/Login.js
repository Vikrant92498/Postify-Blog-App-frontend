import React, { useState } from 'react';
import '../css/Login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    if(e) e.preventDefault();
    const loginDetails = {
        email,
        password
    }
    // Perform validation or submit logic 
    axios.post('http://localhost:5000/api/auth/login',loginDetails)
    .then(res=>{
        console.log(res);
        navigate('/')
    }).catch(err=>{
        console.log(err);
    })
  };
  const handleClick = ()=>{
    navigate('/register')
  }
  const handleClick2 = ()=>{
    setEmail("abcd1234@gmail.com");
    setPassword("abcd1234");
    handleSubmit();
  }
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
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
        <button onClick={handleClick} className='btn'>Register</button>
        <button onClick={handleClick2} className='btn'>Guest Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
