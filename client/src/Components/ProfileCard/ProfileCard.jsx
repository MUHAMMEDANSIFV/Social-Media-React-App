import React,{useState} from 'react'
import "./ProfileCard.css"
import Cover from "../../img/cover.jpg"
import Profile from "../../img/profileImg.jpg"
import {Link} from "react-router-dom"
import {useSelector} from "react-redux"
import EditprofileModel from '../EditprofileModal/EditprofileModel'



function ProfileCard({ProfilePage}) {
   
    const [ModalOpened,setModalOpened] = useState(false);

 const User = useSelector((state) => {
    return state.user;
 })

    return (
        <div className='ProfileCard'>
            <div className='ProfileImage'>
                <img src={Cover} alt="" />
                <img src={Profile} alt="" />
            </div>

            <div className="ProfileName">
                <span >{User ? User.username: ""}</span>
                <span>{User ? User.bio : ""}</span>
            </div>

            <div className="FollowStatus">
                <hr />
                <div>
                    <div className="Follow">
                        <span>{User ? User.followers : 0}</span>
                        <span>Followers</span>
                    </div>
                    <div className="vl"></div>
                    <div className="Follow">
                        <span>{User ? User.following : 0}</span>
                        <span>Following</span>
                    </div>
                    {
                        ProfilePage &&
                        <>
                            <div className='vl'></div>
                            <div className='Follow'>
                                <span>{User.posts ? User.posts : 0}</span>
                                <span>Posts</span>
                            </div>
                        </>
                    }
                </div>
                <hr />
            </div>
            <span>
            {ProfilePage ? <span onClick={() => setModalOpened(true)}>Edit Profile</span>  : <Link className='Link' to="/profile">My Profile</Link>}
            </span>
            <EditprofileModel ModalOpened={ModalOpened} setModalOpened={setModalOpened} />
        </div>
    )
}

export default  React.memo(ProfileCard)
