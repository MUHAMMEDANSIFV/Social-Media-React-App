import React,{useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import './Profile.css'
import  ProfileRight from "../../Components/ProfileRight/ProfileRight"
import ProfileCard from '../../Components/ProfileCard/ProfileCard'
import Postside from "../../Components/Postside/PostSide"
import LeftSide from '../../Components/LeftSide/LeftSide'

function Profile() {

  const navigate = useNavigate()

  useEffect(()=>{
    if(!localStorage.getItem("user")){
      navigate("/")
    }
  })

  return (
    <div className="Profile">
          <LeftSide />

        <div className="ProfileCenter">
            <ProfileCard ProfilePage={true}/>
            <Postside />
        </div>
        <ProfileRight />
    </div>
  )
}

export default Profile
