import React,{useState,useEffect} from 'react'
import PostShare from '../PostShare/PostShare'
import Posts from '../Posts/Posts'
import "./PostSide.css"
import {useDispatch,useSelector} from "react-redux"
import Loder from '../Loder/Loder'
import axios from "../../Api/Axios.instence.js"
axios.defaults.withCredentials = true


function PostSide() {

  const dispatch = useDispatch()

  const PostsList = useSelector((state) => {
    return state.posts
  })

  useEffect(()=>{
    const PostsApi = async () => {
      try{
      const response = await axios.get("/user/all-posts")
      console.log(response)
      dispatch({
        type:"posts",
        payload:response.posts
       })
      } catch (err) {
        alert("network issue")
      }
    }
    PostsApi()
  },[])
  if(!PostsList) return (
        <div className='PostSide'>
      <PostShare />
      <div >
        <Loder />
      </div>
    </div> 
  )
  return (
        <div className='PostSide'>
      <PostShare />
      <Posts PostsList={PostsList} />
    </div> 
  )
}

export default React.memo(PostSide)
