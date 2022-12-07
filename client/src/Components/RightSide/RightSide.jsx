import React from 'react'
import "./RightSide.css"
import Home from "../../img/home.png"
import Noti from "../../img/noti.png"
import Comment from "../../img/comment.png"
import { UilSetting } from "@iconscout/react-unicons"
import FollowersCard from '../FollowersCard/FollowersCard'
import ProfileCard from '../ProfileCard/ProfileCard'


function RightSide() {
  return (
    <div className='RightSide'>
       <div className="navIcons">
         <img src={Home} alt="" />
         <UilSetting />
         <img src={Noti} alt="" />
         <img src={Comment} alt="" />
       </div>
      <ProfileCard ProfilePage={false} />
      <FollowersCard/>
    </div>
    
  )
}

export default RightSide
