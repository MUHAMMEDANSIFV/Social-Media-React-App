import React from 'react'
import Posts from '../Posts/Posts'
import PostShare from '../PostShare/PostShare'
import "./PostSide.css"
import axios from '../../Api/Axios.instence'

function PostSide() {
  function hanleclicke(a){
   axios.get(`/auth/${a}`).then((res)=>{
    alert(res.s)
   })
  }
  return (
    <div className='PostSide'>
      <button onClick={()=>{
        hanleclicke("sample")
      }}>sample</button>
      <button onClick={()=>{
        hanleclicke("test")
      }}>test</button>
      {/* <PostShare />
      <Posts /> */}
    </div>
  )
}

export default PostSide
