import React,{useState} from 'react'
import Conversation from '../../Components/Conversation/Conversation';
import SearchBox from '../../Components/SearchBox/SearchBox'
import './Chat.css'

function Chat() {

  const [chats,setChats] = useState([]);

  return (
    <div className="Chat">
        <div className="Left-side-chat">
            <SearchBox />
            <div className="Chat-container">
            <h2>Chats</h2>
             <div className="Chat-list">
                <Conversation />
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
