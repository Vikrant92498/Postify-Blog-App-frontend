import React, { useState } from 'react';
import '../css/Login.css'
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import axios from 'axios'
const Register= () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const toast = useToast();
  const handleSubmit = (e) => {
    e.preventDefault();
    if(password!==confirmPassword) return ;
    const registerDetails = {
        username,
        email,
        password
    }
    axios.post('https://postify-kkr9.onrender.com/api/auth/register',registerDetails,{
      headers: {
        "Content-Type": "application/json",
      },
    }) 
    .then(res=>{
      toast({
        title:"Login Now",
        status:"success",
        duration:5000,
        isClosable:true,
        position:"bottom"
      });
        navigate('/login');

        //console.log(res);
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
      
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
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
        </div>
        <span>Already Registered?<span onClick={handleClick} style={{cursor:'pointer',color:'#00f1ff'}}>Log in</span></span>
        
      </form>
    </div>
  );
};

export default Register;
