import React, { useState } from 'react';
import axios from 'axios';
import '../css/CreateBlog.css'
const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
  
    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = {
          title,
          content,
          author:"unknown person"
        };
    
        axios.post('http://localhost:5000/api/posts', newPost)
          .then(response => {
            console.log(response.data);
            // Reset form values
            setTitle('');
            setContent('');
          })
          .catch(error => {
            console.error(error);
          });
      };
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
        </div>
      );
    };

export default CreateBlog;