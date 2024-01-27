import React, { useEffect, useState,useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/FullBlogPage.css'
import { useToast } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart ,faArrowLeft, faBucket,faPen } from '@fortawesome/free-solid-svg-icons';
import MyContext from '../MyContext';
import Loading from './Loading';
const FullBlogPage = () => {
    const loggedUser = useContext(MyContext);
    const { id } = useParams();
    const [blogData,setBlogData] = useState();
    const navigate = useNavigate();
    const [likesCount,setLikeCount] = useState();
    const [isLiked,setLiked] = useState(false);
    const toast = useToast()
    //const [logged_userId,setId] = useState();
    const likePost = ()=>{
      const Likepost = {
        logged_userId:loggedUser._id
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

    useEffect(() => {
            const token = localStorage.getItem("token");
            if(!token){
              toast({
                title:"Please Login first",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:"bottom"
              });
              navigate('/login')
              return;
            }
            axios.get(`https://postify-kkr9.onrender.com/api/posts/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              }, 
            })
            .then(response=>{
                setBlogData(response.data);
                setLikeCount(response.data.likesCount);
                const isUserLiked = response.data.likedBy.includes(loggedUser._id);
                if(isUserLiked){ setLiked(true);}
            })     
            .catch((err)=>{
              //Please login First 
              toast({
                title:"Error Occured",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:"bottom" 
              });
              navigate('/login');
            })
             // eslint-disable-next-line
      }, [id]);
      if (!blogData) {
        return <Loading/>
        //return <div className='loading-blog'>Loading...</div>;
      }
    const deleteBlog=()=>{
        axios.delete(`https://postify-kkr9.onrender.com/api/posts/${id}`).then((res)=>{
            console.log(res);
            navigate('/');
        }).catch(err=>{
            console.log(err);
        })
    }
    const handleGoBack = () => {
      // Go back to the previous path using the navigate function
      navigate(-1);
    };
    
    const editBlog = ()=>{
        navigate(`/blog/edit/${id}`,{replace: false })
    }
    const canEditOrDelete = loggedUser && blogData && loggedUser._id === blogData.author._id;
    return (
      <div className="full-blog-container">
        <div className="head">
          
            <FontAwesomeIcon onClick={handleGoBack} className='back-arrow' icon={faArrowLeft} />
     
          {canEditOrDelete && (
    <div>
      <button onClick={deleteBlog} className="delete-button" style={{margin:'3px',background:'red'}}>
        <FontAwesomeIcon icon={faBucket} />
        Delete
      </button>
      <button onClick={editBlog} className="edit-button">
      <FontAwesomeIcon icon={faPen} />
        Edit
      </button>
    </div>
  )}
    </div>
  <img src={blogData.image} alt="" className="blog-image" />
  <h2>{blogData.title}</h2>
  <hr />
  <p>{blogData.content}</p>
  <div className="footer">
            <span className="blog-box__author">By: {blogData.author.username}</span>
            <span className='like-and-comments'>
            <button className={`like-button ${isLiked? 'liked' : 'not-liked'}`} onClick={likePost}>
      <FontAwesomeIcon icon={faHeart} />
      {likesCount}
    </button>
            </span>
  </div>
  
</div>

    ); 
    
}

export default FullBlogPage
