import React from "react";
import { Fragment } from "react";
import "./ChatBox.css";

function ChatBox({ currentUser, currentchat }) {
     return (
          <Fragment>
               <div className='ChatBox-container'>
                    <>
                         <div className='chat-header'>
                              <div className='follower'>
                                   <div>
                                        <img
                                             src={
                                                  currentchat
                                                       ? currentchat.profile
                                                            ? currentchat
                                                                   .profile
                                                                   .profileurl
                                                            : process.env
                                                                   .REACT_APP_PROFILE_URL
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

                         <div className='chat-body'></div>
                    </>
               </div>
          </Fragment>
     );
}

export default ChatBox;
