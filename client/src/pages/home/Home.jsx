import axios from '../../Api/Axios.instence'
import React,{useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import LeftSide from '../../Components/LeftSide/LeftSide'
import PostSide from '../../Components/Postside/PostSide'
import RightSide from '../../Components/RightSide/RightSide'
import './Home.css'

function Home() {

  const navigate = useNavigate()

  

  return (
    <div className='Home'>
      <LeftSide />
      <PostSide />
      <RightSide />
    </div>
  )
}

export default Home
