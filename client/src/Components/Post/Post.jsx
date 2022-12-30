import React,{useState,useEffect} from 'react'
import "./Post.css"
import Comment from "../../img/comment.png"
import Share from "../../img/share.png"
import Heart from "../../img/like.png"
import NotLike from "../../img/notlike.png"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem';
import Menu from  '@mui/material/Menu';
import axios from '../../Api/Axios.instence.js'
import {useSelector,useDispatch} from "react-redux"
import {likepost} from "../../Api/Post.Api.js"
import swal  from "sweetalert";

function Post({data,id}) {

  const [moreoptions,setMoreoptions] = useState(false);
  const [Liked,setLiked] = useState(false);
  const [likescount,setLikesCount] = useState(data.likes.length);
  const User = useSelector((state) => {
    return state.user;
  })

  useEffect(() => {
   const likesfind =  data.likes.find((obj) => User._id == obj.user)
    if(likesfind) setLiked(true)
    else setLiked(false)
  },[]);

  const dispatch = useDispatch()

  const handleClick = (event  ) => {
    setMoreoptions(event.currentTarget);
  }

  const handleClose = () => {
    setMoreoptions(false)
  }

  const open = Boolean(moreoptions)

  const handlesubmit = () =>{
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then(async(willDelete) => {
      if (willDelete) {
        const formdata = {
          postid:data._id,
          userid:User._id,
          postimage:data.postid
        }
        const response = await axios.post("/post/delete-post",formdata,{ withCredentials: true })
        setMoreoptions(false)
        console.log(response)
        if(response.success){
          dispatch({
            type:"posts",
            payload:response.posts
           })
           swal("Poof! Your Post has been deleted!", {
             icon: "success",
           });
        }
      } else {
        swal("Your Post is safe!");
      }
    });
  }

  const postlike = (id) => {
    setLikesCount(Liked ? likescount - 1 : likescount + 1)
    setLiked(!Liked)
     likepost({postid:id},(response) => {
      console.log(response)
      if(response.success){
       dispatch({
        type:"posts",
        payload:response.posts
       })
      }
     })
  }

  return (
    <div className='Post' key={id}>
        <div className='post-more-options'>
          <div>
            
            <IconButton
        aria-label="more"
        onClick={handleClick}
        aria-haspopup="true"
        aria-controls="long-menu"
      >
        <MoreVertIcon />

        </IconButton>
        <Menu 
        moreoptions={moreoptions} 
        keepMounted onClose={handleClose} 
        open={open}>
          <MenuItem
            onClick={() => handlesubmit("edit")}>
            edit
          </MenuItem>
          <MenuItem
            onClick={() => handlesubmit("save")}>
            save
          </MenuItem>
          <MenuItem
            onClick={() => handlesubmit("delete")}>
            delete
          </MenuItem>
      </Menu>
      </div>
          </div>
        <img src={data.posturl} alt="" />

        <div className="PostReact">
          <img src={Liked ? Heart : NotLike} alt=""
          onClick={(e) => postlike(data._id)} />
          <img src={Comment} alt="" />
          <img src={Share} alt="" />
        </div>
        <span style={{color: "var(--gray)",fontSize:'12px'}}>{likescount} Likes</span>

        <div className='detail'>
            <span><b>{data.user.username} </b></span>
            <span>{data.discription}</span>
        </div>
    </div>
  )
}

export default React.memo(Post)
