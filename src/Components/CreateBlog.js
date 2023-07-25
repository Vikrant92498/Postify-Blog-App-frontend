import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/CreateBlog.css'
import { useNavigate } from 'react-router-dom';
const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loggedUser,setLoggedUser] = useState();
    const [imageAdd , setImage] = useState();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = {
          title,
          content,
          image:imageAdd,
          author:loggedUser._id,
        };
       
        axios.post('http://localhost:5000/api/posts', newPost)
          .then(response => {
            //console.log(response.data);
            // Reset form values
            setTitle('');
            setContent('');
            setImage(undefined);
            navigate("/")
          })
          .catch(error => { 
            console.error(error);
          }); 
      };
      useEffect(()=>{
        const user_info = localStorage.getItem("user_data");
        if(!user_info){
          navigate('/login')
        }      
        else{ 
          const userData = JSON.parse(user_info);
          setLoggedUser(userData);
        }
      },[navigate])
      return (
        <div className="create-blog-container">
        <div className="create-blog-form">
          <h2>Create Post</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                placeholder='Title of length below 10 words is best :'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="content">Content:</label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label htmlFor="image">Image Link:</label>
              <input
                type="text"
                id="image"
                placeholder='Image Link'
                value={imageAdd}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <button type="submit">Create</button>
          </form>
        </div>
        </div>
      );
    };

export default CreateBlog;