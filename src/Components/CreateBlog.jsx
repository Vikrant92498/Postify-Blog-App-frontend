import React, { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import '../css/CreateBlog.css'
import { useNavigate } from 'react-router-dom';
import MyContext from '../MyContext';
const CreateBlog = () => {
    const loggedUser = useContext(MyContext);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
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
       
        axios.post('https://postify-kkr9.onrender.com/api/posts', newPost)
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
        if(!loggedUser){
          navigate('/login')
        } 
         // eslint-disable-next-line     
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
                wrap='hard'
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