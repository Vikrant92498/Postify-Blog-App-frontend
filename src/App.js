import React from 'react';
import { BrowserRouter as Router, Routes , Route} from 'react-router-dom';
import BlogList from './Components/BlogList';
import FullBlog from './Components/FullBlogPage';
import CreateBlog from './Components/CreateBlog';
import LoginForm from './Components/Login';
import NavBar from './Components/NavBar';
import RegisterForm from './Components/Register';
import EditBlogPage from './Components/EditBlog';
const App = () => {
  return (
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
  );
};

export default App;

