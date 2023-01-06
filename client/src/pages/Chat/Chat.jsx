import React, { useEffect, Fragment, useState } from 'react';
import './Chat.css';
import { Loader } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import FollowersCard from '../../Components/AllUsers/AllUsers';
import ChatBox from '../../Components/ChatBox/ChatBox';
import { allchatster } from '../../Api/Chat.Api';
import NavBar from '../../Components/NavBar/NavBar';
import Conversation from '../../Components/Conversation/Conversation';

function Chat() {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(null);
  const [currentchat, setcurrentchat] = useState(null);
  const User = useSelector((state) => state.user);

  const chatsters = useSelector((state) => state.chatmembers);

  useEffect(() => {
    setLoader(true);
    allchatster((response) => {
      if (response.success) {
        dispatch({
          type: 'chatmembers',
          payload: response.chatsteres,
        });
      }
      setLoader(false);
    });
  }, []);
  if (loader) {
    return (
      <div className="chatloader">
        <Loader />
      </div>
    );
  }
  return (
    <>
      <NavBar />
      <div className="Chat">
        <div className="Left-side-chat">
          <div className="Chat-container">

            <h2>Chats</h2>
            <div className="Chat-list">
              <Conversation setcurrentchat={setcurrentchat} data={chatsters} />
            </div>

            <h2>Chat Suggestion</h2>
            <FollowersCard status />
            <div className="Chat-list" />
          </div>
        </div>
        <div className="Right-side-chat">
          <ChatBox currentchat={currentchat} currentUser={User} />
        </div>
      </div>
    </>
  );
}

export default Chat;
