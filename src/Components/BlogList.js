import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BlogBox from './BlogBox'
import '../css/BlogList.css'
const BlogList = () => {
    const [blogs,setBlogs] = useState();
    useEffect(()=>{
        axios.get('http://localhost:5000/api/posts')
        .then(blog=>{
            setBlogs(blog.data)
        })
        .catch(err=>{
            console.log(err);
        })
    },[]) 
  return ( 
    <div className='blog-container'>
      {blogs?(
         blogs.map(blog => (
            <BlogBox
              key={blog.id}
              id={blog._id}
              title={blog.title}
              image = {blog.image}
              author={blog.author.username}
              content={blog.content.substring(0, 50)}
            />
          ))
      ):(<div>Fetching</div>)}
    </div>
  )
}

export default BlogList
