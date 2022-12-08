import axios from 'axios'
import React,{ useEffect } from 'react'
import {} from "react-router-dom"
import LeftSide from '../../Components/LeftSide/LeftSide'
import PostSide from '../../Components/Postside/PostSide'
import RightSide from '../../Components/RightSide/RightSide'
import './Home.css'

function Home() {
 
  useEffect(() => {
    (async function(){
     axios.defaults.withCredentials = true;
    const response = await axios.get("http://localhost:5000/user/home",{withCredentials:true})
     if(response.status === "This jwt is not valid"){

     }
    }) ();
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
