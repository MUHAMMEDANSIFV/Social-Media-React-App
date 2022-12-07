import React,{useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import LeftSide from '../../Components/LeftSide/LeftSide'
import PostSide from '../../Components/Postside/PostSide'
import RightSide from '../../Components/RightSide/RightSide'
import './Home.css'

function Home() {

  const navigate = useNavigate()

  useEffect(()=>{
    if(!localStorage.getItem("user")){
      navigate("/")
    }
  })
  return (
    <div className='Home'>
      <LeftSide />
      <PostSide />
      <RightSide />
    </div>
  )
}

export default Home
