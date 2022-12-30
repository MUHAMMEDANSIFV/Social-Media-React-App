import React,{useState,Fragment, useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import './Profile.css'
import  ProfileRight from "../../Components/ProfileRight/ProfileRight"
import ProfileCard from '../../Components/ProfileCard/ProfileCard'
import LeftSide from '../../Components/LeftSide/LeftSide'
import axios from '../../Api/Axios.instence'
import {useDispatch} from "react-redux"
import PostShare from '../../Components/PostShare/PostShare'
import Posts from '../../Components/Posts/Posts'
import Loder from '../../Components/Loder/Loder'
import NavBar from '../../Components/NavBar/NavBar'

function Profile() {

  const navigate = useNavigate()
  const [Loading,setLoading] = useState(true)
  const [PostsList,setPostsList] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
     jwtveryfication()
  })

  const jwtveryfication = async () => {
     const response = await axios.get("/user/profile")
     if(response.message){ 
      dispatch({
        type:"user",
        payload:response.user
       })
       setPostsList(response.user.post)
       setLoading(false)
     }else{
       navigate("/")
     }
  }
  if(Loading) return (
    <Fragment>
    <div className="Profile">
      <LeftSide />
       <Loder />
    </div>
</Fragment>
  )
  return (
    <Fragment>
         <NavBar />
        <div className="Profile">
          <LeftSide />
        <div className="ProfileCenter">
            <ProfileCard ProfilePage={true}/>
            <PostShare />
            <Posts PostsList={PostsList} />
        </div>
        <ProfileRight />
        </div>
    </Fragment>
  )
}

export default Profile
