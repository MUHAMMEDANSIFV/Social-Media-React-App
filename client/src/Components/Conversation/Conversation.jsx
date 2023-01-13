import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function Conversation({ setcurrentchat }) {
  const data = useSelector((state) => state.chatmembers);
  console.log(data);
  if (!data) {
    return (
      <div>
        You have no chat yet
      </div>
    );
  }
  return (
    <>
      {data.chatsters.map((chatster) => (
        <>
          <div className="follower conversation">
            <div onClick={() => setcurrentchat(chatster.personid)}>
              <div className="online-dot" />
              <img
                src={
                    chatster.profile
                      ? chatster.profile.profileurl
                      : process.env.REACT_APP_PROFILE_URL
                  }
                alt=""
                className="followerImage"
                style={{ width: '50px', height: '50px' }}
              />
              <div className="name" style={{ fontSize: '0.8rem' }}>
                <span>{chatster.personid.username}</span>
                <span>Online</span>
              </div>
            </div>
          </div>
          <hr style={{ width: '85%', border: '0.1px solid #ececec' }} />
        </>
      ))}
    </>
  );
}

Conversation.propTypes = {
  setcurrentchat: PropTypes.string.isRequired,
};

export default Conversation;
