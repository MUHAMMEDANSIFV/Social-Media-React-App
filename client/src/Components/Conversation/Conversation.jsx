import { Loader } from '@mantine/core'
import React, { Fragment } from 'react'
import {useSelector} from "react-redux"

function Conversation({setcurrentchat}) {

  const data = useSelector((state) => {
    return state.chatmembers
  })
  if(!data) return(
    <Loader />
  )
  return (
    <Fragment>
      {
        data.chatsters.map((chatster,id) => {
          return (
               <>
                    <div key={id} className='follower conversation'>
                         <div onClick={() => setcurrentchat(chatster.personid)}>
                              <div className='online-dot'></div>
                              <img
                                   src={
                                        chatster.profile
                                             ? chatster.profile.profileurl
                                             : process.env.REACT_APP_PROFILE_URL
                                   }
                                   alt=''
                                   className='followerImage'
                                   style={{ width: "50px", height: "50px" }}
                              />
                              <div
                                   className='name'
                                   style={{ fontSize: "0.8rem" }}
                              >
                                   <span>{chatster.personid.username}</span>
                                   <span>Online</span>
                              </div>
                         </div>
                    </div>
                    <hr
                         style={{ width: "85%", border: "0.1px solid #ececec" }}
                    />
               </>
          );
        })
      }
         </Fragment>
  )
}

export default Conversation;
