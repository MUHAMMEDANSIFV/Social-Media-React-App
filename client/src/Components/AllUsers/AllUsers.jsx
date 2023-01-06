/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import './AllUsers.css';
import { Loader } from '@mantine/core';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllUser } from '../../Api/User.Api';
import { addnewchat } from '../../Api/Chat.Api';

function AllUsers({ status }) {
  const [allusers, setAllUsers] = useState(null);
  const [loader, setLoader] = useState(null);

  useEffect(() => {
    setLoader(true);
    getAllUser((response) => {
      if (response.success) {
        setAllUsers(response.AllUser);
      } else {
        console.log(response);
      }
    });
    setLoader(false);
  }, []);
  if (loader) return <Loader />;
  return (
    <div className="FollowersCard">
      <h3>{status ? '' : 'Suggestion for follow'}</h3>
      {allusers
        ? allusers.map((followers) => (
          <div>
            {status ? (
              <ChatList followers={followers} />
            ) : (
              <FollowersList followers={followers} />
            )}
          </div>
        ))
        : ''}
    </div>
  );
}

function FollowersList({ followers }) {
  return (
    <div className="Follower">
      <div>
        <img
          src={
            followers.profile
              ? followers.profile.profileurl
              : process.env.REACT_APP_PROFILE_URL
          }
          alt="retry"
          className="followerimg"
        />
        <div className="name">
          <span>
            {followers.firstname}
            {' '}
            {followers.lastname}
          </span>
          <span>@sample</span>
        </div>
      </div>
      <button className="button followers-button">Follow</button>
    </div>
  );
}

function ChatList({ followers }) {
  const dispatch = useDispatch();

  const addtochat = (id) => {
    addnewchat({ chatster: id }, (response) => {
      if (response.success) {
        dispatch({
          type: 'chatmembers',
          payload: response.Chatsters,
        });
      }
    });
  };

  return (
    <div className="Follower">
      <div>
        <img
          src={
            followers.profile
              ? followers.profile.profileurl
              : process.env.REACT_APP_PROFILE_URL
          }
          alt="retry"
          className="followerimg"
        />
        <div className="name">
          <span>
            {followers.firstname}
            {' '}
            {followers.lastname}
          </span>
          <span>
            @
            {followers.username}
          </span>
        </div>
      </div>
      <button
        onClick={() => addtochat(followers._id)}
        className="button followers-button"
      >
        Chat
      </button>
    </div>
  );
}

AllUsers.propTypes = {
  status: PropTypes.string.isRequired,
};

ChatList.propTypes = {
  followers: PropTypes.string.isRequired,
};

FollowersList.propTypes = {
  followers: PropTypes.string.isRequired,
};

export default AllUsers;
