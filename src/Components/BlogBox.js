import React ,{ useState ,useEffect}from 'react';
import { Link  } from 'react-router-dom';
import '../css/BlogBox.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
//import MyContext from '../MyContext';
const BlogBox = ({id, title,image, author, content ,likeCount,likedBy}) => {
  ///const navigate=useNavigate();
  //const loggedUser = useContext(MyContext);
  const [logged_userId,setId] = useState();
  const [likesCount,setLikeCount] = useState();
  const [isLiked,setLiked] = useState(false);
  const likePost = ()=>{
    if(!logged_userId) return
    const Likepost = {
      logged_userId
    };

    axios.post(`https://postify-kkr9.onrender.com/api/posts/like/${id}`, Likepost)
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
    setLikeCount(likeCount);
    if(!user_info){
      return
    }       
    else{ 
      const userData = JSON.parse(user_info);
      setId(userData._id);
      const isUserLiked = likedBy.includes(userData._id);
      if(isUserLiked) setLiked(true);
      
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
