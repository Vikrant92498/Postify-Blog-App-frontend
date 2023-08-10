import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import '../css/navBar.css'
import { useNavigate} from "react-router-dom";
const NavBar = ()=>{
  const [loggedUser,setLoggedUser] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const user_info = localStorage.getItem("user_data");
    setLoggedUser(user_info);
  }, [loggedUser]);
  const logoutHandler = ()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user_data");
    navigate("/", { replace: true })
    setLoggedUser(undefined);
  } 
    return (
      <nav className="navbar">
      <div className="navbar__left">
        <h1 className="navbar__title"><Link to="/" style={{textDecoration:"none" ,color:"black"}}>Postify</Link></h1>
      </div>
      <div className="navbar__right">
        <ul className="navbar__list">
          <li className="navbar__item"><Link to="/create" className="navbar__link">Create Blog</Link></li>
          {!loggedUser && (
            <li className="navbar__item">
              <Link to="/login" className="navbar__link">Login</Link>
            </li>
          )}
           {loggedUser && (
            <li className="navbar__item">
              <Link to="/" className="navbar__link" onClick={logoutHandler}>Logout</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
      );
};

export default NavBar;