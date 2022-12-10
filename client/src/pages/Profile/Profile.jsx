import React,{Fragment, useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import './Profile.css'
import  ProfileRight from "../../Components/ProfileRight/ProfileRight"
import ProfileCard from '../../Components/ProfileCard/ProfileCard'
import Postside from "../../Components/Postside/PostSide"
import LeftSide from '../../Components/LeftSide/LeftSide'
import Loder from '../../Components/Loder/Loder'
import axios from '../../Api/Axios.instence'
import {useDispatch} from "react-redux"

function Profile() {

  const navigate = useNavigate()

  const [Loderworking,setLoderworking] = useState(true)

  const dispatch = useDispatch()

  useEffect(()=>{
     jwtveryfication()
  })

  const jwtveryfication = async () => {
     axios.defaults.withCredentials = true
     const response = await axios.get("/user/profile")
     if(response.data.message){ 
      dispatch({
        type:"user",
        payload:response.data.user
       })
        setLoderworking(false)
     }else if(response.data.status === "jwt expired"){
      refreshtoken()
     }else{
       navigate("/")
     }
  }

  const refreshtoken = async () => {
    axios.defaults.withCredentials = true
    const response = await axios.get("/auth/refreshtoken",{withCredentials:true})
    console.log(response)
    if(response.data.message){
      jwtveryfication()
    }else if(response.data.error){
      navigate("/")
    }
  }

  return (
    <Fragment>
      {
        Loderworking ?
        <Loder /> :
        <div className="Profile">
          <LeftSide />

        <div className="ProfileCenter">
            <ProfileCard ProfilePage={true}/>
            <Postside />
        </div>
        <ProfileRight />
        </div>
      }
    </Fragment>
  )
}

export default Profile
