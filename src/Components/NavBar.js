import React from "react";
import {Link} from 'react-router-dom'
import '../css/navBar.css'
const NavBar = ()=>{
    return (
      <nav className="navbar">
      <div className="navbar__left">
        <h1 className="navbar__title">Postify</h1>
      </div>
      <div className="navbar__right">
        <button className="navbar__button"><Link to="/login">Login</Link></button>
        <button className="navbar__button"><Link to="/create">Create Blog</Link></button>
        <button className="navbar__button"><Link to="/">Refresh</Link></button>
      </div>
    </nav>
      );
};

export default NavBar;