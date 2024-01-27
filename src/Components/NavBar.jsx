import React, { useEffect, useState } from 'react'
import { Link  } from "react-router-dom";
import '../css/navBar.css'
const NavBar = () => {
    const [loggedUser,setLoggedUser] = useState();
     
    useEffect(() => {
      const user_info = localStorage.getItem("user_data");
      setLoggedUser(user_info);
    }, [loggedUser]);
    const logoutHandler = ()=>{
      localStorage.removeItem("token");
      localStorage.removeItem("user_data");
      window.location.reload();
      window.location.href = '/';
      
    } 
  return (
    <header className="header">
    <nav className="navbar">
      <h2 className="logo"><Link to="/">Postify</Link></h2>
      <ul className="links">
        <li><Link to="/new">Liked Blogs</Link></li>
        <li><Link to="/create">Write</Link></li>
      </ul>
      <div className="buttons">
        {!loggedUser && <Link className='button' to="/login">Login</Link>}
        {!loggedUser && <Link className='button' to="/register">Register</Link>}
        {loggedUser && <span style={{color:"white"}} onClick={logoutHandler}>Logout</span>}
      </div>
      
    </nav>
  </header>
  )
}

export default NavBar
