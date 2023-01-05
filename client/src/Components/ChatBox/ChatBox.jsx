import React, { useState } from "react";
import { Fragment } from "react";
import "./ChatBox.css";
import InputEmoji from "react-input-emoji";

function ChatBox({ currentUser, currentchat }) {
     const [newMessage, setNewMessages] = useState("");
     const [chats, setChats] = useState(null);

     const handlechange = (newMessages) => {
          setNewMessages(newMessages)
     };

     const onSubmit = () => {
          
     }

     return (
          <Fragment>
               <div className='ChatBox-container'>
                    {currentchat ? (
                         <>
                              <div className='chat-header'>
                                   <div className='follower'>
                                        <div>
                                             <img
                                                  src={
                                                       currentchat.profile
                                                            ? currentchat
                                                                   .profile
                                                                   .profileurl
                                                            : process.env
                                                                   .REACT_APP_PROFILE_URL
                                                  }
                                                  alt=''
                                                  className='followerImage'
                                                  style={{
                                                       width: "50px",
                                                       height: "50px",
                                                  }}
                                             />
                                             <div
                                                  className='name'
                                                  style={{ fontSize: "0.8rem" }}
                                             >
                                                  <span>
                                                       {currentchat
                                                            ? currentchat.username
                                                            : ""}
                                                  </span>
                                                  <span></span>
                                             </div>
                                        </div>

                                        <hr
                                             style={{
                                                  width: "85%",
                                                  border: "0.1px solid #ececec",
                                             }}
                                        />
                                   </div>
                              </div>

                              <div className='chat-body'>
                                   {chats ? (
                                        <>
                                             <div className='message '>
                                                  <span>Hi how are you</span>
                                                  <span>10/12/2022</span>
                                             </div>
                                             <div className='message '>
                                                  <span>I am fine</span>
                                                  <span>10/12/2022</span>
                                             </div>
                                        </>
                                   ) : (
                                        ""
                                   )}
                              </div>
                              <div className='chat-sender'>
                                   <div>+</div>
                                   <InputEmoji
                                        value={newMessage}
                                        onChange={(e) => handlechange(e)}
                                   />
                                   <div className='send-button button'
                                   onClick={onSubmit}
                                   >
                                        Send
                                   </div>
                              </div>
                         </>
                    ) : (
                         <div className='start-chat'>
                              <span>Tap on a Chat to start Conversation</span>
                         </div>
                    )}
               </div>
          </Fragment>
     );
}

export default ChatBox;
