import React from 'react'
import "./FollowersCard.css"
import {Follwers} from "../../Data/FollowersData"

function FollowersCard() {
  return (
    <div className="FollowersCard">
        <h3>Who is following you</h3>
         {
            Follwers.map((followers,id)=>{
                return(
                    <div className="Follower">
                        <div>
                        <img src={followers.img} alt="" className='followerimg' />
                        <div className="name">
                            <span>{followers.name}</span>
                            <span>@{followers.username}</span>
                        </div>
                        </div>
                    <button className='button followers-button'>
                        Follow
                    </button>
                    </div>
                )
            })
         }
    </div>
  )
}

export default FollowersCard
