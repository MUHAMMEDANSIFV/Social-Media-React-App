import React from 'react'
import FollowersCard from '../FollowersCard/FollowersCard'
import InfoCard from "../InfoCard/InfoCard"
import "./ProfileRight.css"

function ProfileLeft() {
  return (
    <div className="ProfileLeft">
        <InfoCard />
        <FollowersCard />
    </div>

  )
}

export default ProfileLeft
