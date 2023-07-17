import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/FullBlogPage.css'
const FullBlogPage = () => {
    const { id } = useParams();
    const [blogData,setBlogData] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        
            axios.get(`http://localhost:5000/api/posts/${id}`)
            .then(response=>{
                console.log(response.data)
                setBlogData(response.data);
            })
            .catch(err=>{
                console.log(err);
            })
      }, [id,navigate]);
      if (!blogData) {
        return <div className='loading-blog'>Loading...</div>;
      }
    const deleteBlog=()=>{
        axios.delete(`http://localhost:5000/api/posts/${id}`).then((res)=>{
            console.log(res);
            navigate('/');
        }).catch(err=>{
            console.log(err);
        })
    }
    const editBlog = ()=>{
        navigate(`/blog/edit/${id}`,{replace: false })
    }
    return (
      <div className="full-blog-container">
        <h2>{blogData.title}</h2>
        <p>{blogData.content}</p>
        <p>{blogData.author}</p>
        <button onClick={deleteBlog} style={{background:"red"}}>Delete this Blog</button>
        <button onClick={editBlog} >Edit this Blog</button>
      </div>
    );
    
}

export default FullBlogPage
