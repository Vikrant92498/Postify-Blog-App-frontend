import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/EditBlog.css'
import MyContext from '../MyContext';
import Loading from './Loading';
const EditBlog = () => {
    const loggedUser = useContext(MyContext);
    const { id } = useParams();
    const [title,setTitle] = useState();
    const [content,setContent] = useState();
    const navigate = useNavigate();
    useEffect(() => {
            console.log(loggedUser);
            axios.get(`https://postify-kkr9.onrender.com/api/posts/${id}`)
            .then(response=>{
                setTitle(response.data.title);
                setContent(response.data.content);
            })
            .catch(err=>{
                console.log(err);
            })
             // eslint-disable-next-line
      }, [id,navigate]);
      const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = {
          title,
          content,
          author:loggedUser._id
        };
     
        axios.put(`https://postify-kkr9.onrender.com/api/posts/${id}`, newPost)
          .then(response => {
            console.log(response.data);
            // Reset form values
            setTitle('');
            setContent('');
            navigate(`/blog/${id}`)
          })
          .catch(error => {
            console.error(error);
          });
      };
      if (!title) {
        return <Loading/>;
      }
    
  return (
    <div className="edit-blog-container">
          <h2>Edit Post</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
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
            <button type="submit">Submit</button>
          </form>
        </div>
  )
}

export default EditBlog;