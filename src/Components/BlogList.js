import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BlogBox from './BlogBox'
import '../css/BlogList.css'
import Loading from './Loading'
const BlogList = () => {
    const [blogs,setBlogs] = useState();
    useEffect(()=>{
        axios.get('https://postify-kkr9.onrender.com/api/posts')
        .then(blog=>{
          console.log(blog);
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
              content={blog.content.substring(0, 80)}
              likeCount={blog.likesCount}
              likedBy={blog.likedBy}
            />
          ))
      ):(<Loading/>)}
    </div>
  )
}

export default BlogList
