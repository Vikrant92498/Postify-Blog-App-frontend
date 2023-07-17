import React from 'react';
import { Link } from 'react-router-dom';
import '../css/BlogBox.css'
const BlogBox = ({id, title, author, content }) => {
  return (
    <div className="blog-box">
      <h2 className="blog-box__title">{title}</h2>
      <p className="blog-box__content">{content}</p>
      <p className="blog-box__author">Author: {author}</p>
      <Link to={`/blog/${id}`}>Read More</Link>
    </div>
  );
};

export default BlogBox;
