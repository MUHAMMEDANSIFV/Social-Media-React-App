import React,{useState} from 'react'
import "./ProfileCard.css"
import Cover from "../../img/cover.jpg"
import Profile from "../../img/profileImg.jpg"
import {Link} from "react-router-dom"

function ProfileCard({ProfilePage}) {
 
   
   

    return (
        <div className='ProfileCard'>
            <div className='ProfileImage'>
                <img src={Cover} alt="" />
                <img src={Profile} alt="" />
            </div>

            <div className="ProfileName">
                <span ></span>
                <span>Mearn Stack </span>
            </div>

            <div className="FollowStatus">
                <hr />
                <div>
                    <div className="Follow">
                        <span>6090</span>
                        <span>Followers</span>
                    </div>
                    <div className="vl"></div>
                    <div className="Follow">
                        <span>6090</span>
                        <span>Followers</span>
                    </div>
                    {
                        ProfilePage &&
                        <>
                            <div className='vl'></div>
                            <div className='Follow'>
                                <span>3</span>
                                <span>Posts</span>
                            </div>
                        </>
                    }
                </div>
                <hr />
            </div>
            <span>
            {ProfilePage ? "Edit Profile"  : <Link className='Link' to="/profile">My Profile</Link>}
            </span>

        </div>
    )
}

export default ProfileCard
