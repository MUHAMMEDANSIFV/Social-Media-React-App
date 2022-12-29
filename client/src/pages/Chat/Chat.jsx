import React,{useEffect, Fragment} from 'react'
import Conversation from '../../Components/Conversation/Conversation';
import {allchatster} from "../../Api/Chat.Api.js"
import './Chat.css'
import NavBar from '../../Components/NavBar/NavBar';

function Chat() {

//   const [chats,setChats] = useState([]);

  useEffect(() => {
     allchatster((response) => {
     // if(response.success) setChats(response.chatsteres)
     })
  }, []);

  return (
   <Fragment>
      <NavBar />
    <div className="Chat">
        <div className="Left-side-chat">
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
   </Fragment>
  )
}

export default Chat
