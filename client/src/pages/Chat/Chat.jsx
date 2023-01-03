import React, { useEffect, Fragment } from "react";
import Conversation from "../../Components/Conversation/Conversation";
import { allchatster } from "../../Api/Chat.Api.js";
import "./Chat.css";
import NavBar from "../../Components/NavBar/NavBar";
import { useState } from "react";
import FollowersCard from "../../Components/AllUsers/AllUsers";
import ChatBox from "../../Components/ChatBox/ChatBox"
import {useSelector} from "react-redux"
import { Loader } from "@mantine/core";
import {useDispatch } from "react-redux"

function Chat() {

     const dispatch = useDispatch()
     const [loader, setLoader] = useState(null);
     const [currentchat,setcurrentchat] = useState(null)
     const User = useSelector((state) => {
          return state.user;
     })

     const chatsters = useSelector((state) =>{
      return state.chatmembers
     })

     useEffect(() => {
          setLoader(true)
          allchatster((response) => {
               if (response.success) {
                     dispatch({
                          type: "chatmembers",
                          payload: response.chatsteres,
                     });
               }
               setLoader(false)
          });
     }, []);
     if(loader) return (
          <Fragment>
               <div className='chatloader'>
                    <Loader />
               </div>
          </Fragment>
     );
     return (
          <Fragment>
               <NavBar />
               <div className='Chat'>
                    <div className='Left-side-chat'>
                         <div className='Chat-container'>
          
                                        <h2>Chats</h2>
                                        <div className='Chat-list'>
                                             <Conversation setcurrentchat={setcurrentchat} data={chatsters} />
                                        </div>

                              <h2>Chat Suggestion</h2>
                              <FollowersCard status={true} />
                              <div className='Chat-list'></div>
                         </div>
                    </div>
                    <div className='Right-side-chat'>
                         <ChatBox currentchat={currentchat} currentUser={User} />
                    </div>
               </div>
          </Fragment>
     );
}

export default Chat;
