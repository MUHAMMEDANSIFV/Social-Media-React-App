import React from 'react'
import "./RightSide.css"
import FollowersCard from '../FollowersCard/FollowersCard'
import ProfileCard from '../ProfileCard/ProfileCard'


function RightSide() {
  return (
    <div className='RightSide'>
      <ProfileCard ProfilePage={false} />
      <FollowersCard/>
    </div>
    
  )
}

export default RightSide
