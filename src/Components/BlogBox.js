import React ,{ useState ,useEffect }from 'react';
import { Link ,useNavigate } from 'react-router-dom';
import '../css/BlogBox.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
const BlogBox = ({id, title,image, author, content }) => {
  const navigate=useNavigate();
  const [logged_userId,setId] = useState();
  const [likesCount,setLikeCount] = useState();
  const [isLiked,setLiked] = useState();
  const likePost = ()=>{
    const Likepost = {
      logged_userId
    };

    axios.post(`http://localhost:5000/api/posts/like/${id}`, Likepost)
      .then(response => {
        setLikeCount(response.data.likesCount);
        setLiked(response.data.isLiked);
      })
      .catch(error => { 
        console.error(error);
      }); 
  }
  useEffect(()=>{
    const user_info = localStorage.getItem("user_data");
    if(!user_info){
      return
    }      
    else{ 
      const userData = JSON.parse(user_info);
      setId(userData._id);
      likePost();
    }
  },[])
  return (  
    <div className="blog-box">
        <img src={image} alt="" />
        <h2 className="blog-box__title">{title}</h2>
        <span className="blog-box__content">{content}</span>
        <Link to={`/blog/${id}`}>Read More</Link>
        <div className="footer">
            <span className="blog-box__author">By: {author}</span>
            <span className='like-and-comments'>
            <button className={`like-button ${isLiked ? 'liked' : 'not-liked'}`} onClick={likePost}>
      <FontAwesomeIcon icon={faHeart} />
      {likesCount}
    </button>
    </span>
        </div>
    </div>
  );
};

export default BlogBox;
