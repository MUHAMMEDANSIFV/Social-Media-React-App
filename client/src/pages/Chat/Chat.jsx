import React,{useState,useEffect} from 'react'
import Conversation from '../../Components/Conversation/Conversation';
import {allchatster} from "../../Api/Chat.Api.js"
import SearchBox from '../../Components/SearchBox/SearchBox'
import './Chat.css'

function Chat() {

  const [chats,setChats] = useState([]);

  useEffect(() => {
     allchatster((response) => {
      if(response.success) setChats(response.chatsteres)
     })
  }, []);

  return (
    <div className="Chat">
        <div className="Left-side-chat">
            <SearchBox />
            <div className="Chat-container">
            <h2>Chats</h2>
             <div className="Chat-list">
                <Conversation />
             </div>

             <h2>Chat Suggestion</h2>
             <div className='Chat-list'>
                 
                </div>          
                </div>

        </div>
        <div className="Right-side-chat">
               Right side
        </div>
    </div>
  )
}

export default Chat
