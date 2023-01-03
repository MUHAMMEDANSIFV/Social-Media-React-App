import React, { useEffect, useState } from "react";
import "./AllUsers.css";
import { getAllUser } from "../../Api/User.Api.js";
import { Loader } from "@mantine/core";
import {addnewchat} from "../../Api/Chat.Api"
import {useDispatch} from "react-redux"

function AllUsers({ status }) {
     const [allusers, setAllUsers] = useState(null);
     const [loader, setLoader] = useState(null);

     useEffect(() => {
          setLoader(true);
          getAllUser((response) => {
               if (response.success) {
                    setAllUsers(response.AllUser);
               } else {
                  console.log(response)
               }
          });
          setLoader(false);
     }, []);
     if (loader) return <Loader />;
     return (
          <div className='FollowersCard'>
               <h3>{status ? "" : "Suggestion for follow"}</h3>
               {allusers
                    ? allusers.map((followers, id) => {
                           return (
                                <div key={id}>
                                    {status ? <ChatList followers={followers}  /> : <FollowersList followers={followers} /> }
                                </div>
                           );
                      })
                    : ""}
          </div>
     );
}

function FollowersList({followers}) {
     return (
          <div className='Follower'>
               <div>
                    <img
                         src={
                              followers.profile ?
                              followers.profile.profileurl :
                               process.env.REACT_APP_PROFILE_URL
                         }
                         alt='retry'
                         className='followerimg'
                    />
                    <div className='name'>
                         <span>
                              {followers.firstname} {followers.lastname}
                         </span>
                         <span>@sample</span>
                    </div>
               </div>
               <button className='button followers-button'>Follow</button>
          </div>
     );
}

function ChatList({followers}) {

     const dispatch = useDispatch();    

    const addtochat = (id) => {
        addnewchat({chatster:id},(response) => {
          if(response.success){
             dispatch({
                  type: "chatmembers",
                  payload: response.Chatsters,
             });
          }else{

          }
        })
    }

     return (
          <div className='Follower'>
               <div>
                    <img
                         src={
                              followers.profile
                                   ? followers.profile.profileurl
                                   : process.env.REACT_APP_PROFILE_URL
                         }
                         alt='retry'
                         className='followerimg'
                    />
                    <div className='name'>
                         <span>
                              {followers.firstname} {followers.lastname}
                         </span>
                         <span>@{followers.username}</span>
                    </div>
               </div>
               <button
                    onClick={() => addtochat(followers._id)}
                    className='button followers-button'
               >
                    Chat
               </button>
          </div>
     );
}

export default AllUsers;
