import React, { useState } from 'react';
import { BrowserRouter as Router, Routes , Route} from 'react-router-dom';
import BlogList from './Components/BlogList';
import FullBlog from './Components/FullBlogPage';
import CreateBlog from './Components/CreateBlog';
import LoginForm from './Components/Login';
import NavBar from './Components/NavBar';
import RegisterForm from './Components/Register';
import EditBlogPage from './Components/EditBlog';
import myContext from './MyContext'
import { useEffect } from 'react';
import './App.css'
const App = () => {
  const [loggedUser,setLoggedUser]=useState();
  useEffect(()=>{
    const user_info = localStorage.getItem("user_data");
    const userData = JSON.parse(user_info);
    if(!userData) return ;
    setLoggedUser(userData);
},[])
  return (
    <myContext.Provider value={loggedUser}>
    <Router>
      <div className="app-container">
        <NavBar />
        
      <Routes>
        <Route exact path="/" element={<BlogList/>} />
        <Route path="/blog/:id" element={<FullBlog/>} />
        <Route path="/blog/edit/:id" element={<EditBlogPage/>} />
        <Route path="/create" element={<CreateBlog/>} />
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/register" element={<RegisterForm/>} />
      </Routes>
    
      </div>
    </Router>
    </myContext.Provider>
  );
};

export default App;

