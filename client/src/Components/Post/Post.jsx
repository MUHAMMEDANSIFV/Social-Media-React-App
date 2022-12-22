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
import swal  from "sweetalert"

function Post({data,id}) {

  const [moreoptions,setMoreoptions] = useState(false);
  const [Liked,setLiked] = useState(false);
  const User = useSelector((state) => {
    return state.user;
  })

  useEffect(() => {
   const likesfind =  data.likes.find((user) => User._id === user.user)
   if(likesfind){
    setLiked(true)
   }else{
    setLiked(false)
   }
  },[Liked]);

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
        const response = await axios.post("/user/delete-post",formdata,{ withCredentials: true })
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

  const postlike = (event) => {
     
  }

  return (
    <div className='Post' key={id}>
        <div className='post-more-options'>
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
        <img src={data.posturl} alt="" />

        <div className="PostReact">
          <img src={NotLike} alt=""
          onClick={(e) => postlike(e)} />
          <img src={Comment} alt="" />
          <img src={Share} alt="" />
        </div>
        <span style={{color: "var(--gray)",fontSize:'12px'}}>{data.likes ? data.likes.length : 0} Likes</span>

        <div className='detail'>
            <span><b>{data.user.username} </b></span>
            <span>{data.discription}</span>
        </div>
    </div>
  )
}

export default React.memo(Post)
