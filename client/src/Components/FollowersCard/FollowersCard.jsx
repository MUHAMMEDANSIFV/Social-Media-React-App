import React,{useEffect,useState} from 'react'
import "./FollowersCard.css"
import {getAllUser} from "../../Api/User.Api.js"
import { Loader } from '@mantine/core';

function FollowersCard() {

     const [allusers,setAllUsers] = useState(null);
     const [loader,setLoader] = useState(null);

    useEffect(() => {
        setLoader(true)
       getAllUser((response) => {
        if(response.success){
           setAllUsers(response.AllUser)
          }else{
            alert("network issue")
          }
        })
        setLoader(false)
    }, []);
    if(loader) return <Loader />
  return (
    <div className="FollowersCard">
        <h3>Suggestion for follow</h3>
         {
          allusers ?  allusers.map((followers,id)=>{
                return(
                    <div  className="Follower">
                        <div>
                        <img src={followers.profile ? followers.profile : "https://res.cloudinary.com/dc0agfvze/image/upload/v1672126296/profile/33466_o9omln.jpg"} alt="" className='followerimg' />
                        <div className="name">
                            <span>{followers.firstname} {followers.lastname}</span>
                            <span>@sample</span>
                        </div>
                        </div>
                    <button className='button followers-button'>
                        Follow
                    </button>
                    </div>
                )
            })
            : ""
         }
    </div>
  )
}

export default FollowersCard
