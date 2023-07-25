import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/EditBlog.css'
const EditBlog = () => {
    const { id } = useParams();
    const [title,setTitle] = useState();
    const [content,setContent] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        
            axios.get(`http://localhost:5000/api/posts/${id}`)
            .then(response=>{
                console.log(response);
                setTitle(response.data.title);
                setContent(response.data.content);
            })
            .catch(err=>{
                console.log(err);
            })
      }, [id,navigate]);
      const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = {
          title,
          content,
          author:"unknown person"
        };
    
        axios.put(`http://localhost:5000/api/posts/${id}`, newPost)
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
        return <div>Loading...</div>;
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