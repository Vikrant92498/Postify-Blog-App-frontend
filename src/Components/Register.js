import React, { useState } from 'react';
import '../css/Login.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
const Register= () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if(password!==confirmPassword) return ;
    const registerDetails = {
        username,
        email,
        password
    }
    axios.post('http://localhost:5000/api/auth/register',registerDetails,{
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(res=>{
        navigate('/');
        console.log(res);
    })
    .catch(err=>{
        console.log(err);
    })
    // Perform validation or submit logic here
  };
  const handleClick = ()=>{
    navigate('/login')
  }
  return (
    <div className="login-container">
      <h2>Create your Account</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
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
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="btn-container">
        <button type="submit" className='btn'>Submit</button>
        <button onClick={handleClick} className='btn'>Log In</button>
        </div>
        
      </form>
    </div>
  );
};

export default Register;
