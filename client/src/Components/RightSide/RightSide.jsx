import React from 'react'
import "./RightSide.css"
import FollowersCard from '../FollowersCard/FollowersCard'
import ProfileCard from '../ProfileCard/ProfileCard'
import NavIcons from '../NavIcons/NavIcons'


function RightSide() {
  return (
    <div className='RightSide'>
       <NavIcons />
      <ProfileCard ProfilePage={false} />
      <FollowersCard/>
    </div>
    
  )
}

export default RightSide
