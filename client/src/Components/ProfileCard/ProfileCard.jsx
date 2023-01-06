import React, { useState } from 'react';
import './ProfileCard.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Cover from '../../img/cover.jpg';
import EditprofileModel from '../EditprofileModal/EditprofileModel';

function ProfileCard({ Postscount, ProfilePage }) {
  const [ModalOpened, setModalOpened] = useState(false);

  const User = useSelector((state) => state.user);

  return (
    <div className="ProfileCard">
      <div className="ProfileImage">
        <img src={Cover} alt="" />
        <img
          src={
                              User.profile
                                ? User.profile.profileurl
                                : process.env.REACT_APP_PROFILE_URL
                         }
          alt=""
        />
      </div>

      <div className="ProfileName">
        <span>{User ? User.username : ''}</span>
        <span>{User ? User.bio : ''}</span>
      </div>

      <div className="FollowStatus">
        <hr />
        <div>
          <div className="Follow">
            <span>
              {User.followers ? User.followers.length : 0}
            </span>
            <span>Followers</span>
          </div>
          <div className="vl" />
          <div className="Follow">
            <span>
              {User.following ? User.following.length : 0}
            </span>
            <span>Following</span>
          </div>
          {ProfilePage && (
          <>
            <div className="vl" />
            <div className="Follow">
              <span>
                {Postscount || 0}
              </span>
              <span>Posts</span>
            </div>
          </>
          )}
        </div>
        <hr />
      </div>
      <span>
        {ProfilePage ? (
          <span onClick={() => setModalOpened(true)}>
            Edit Profile
          </span>
        ) : (
          <Link className="Link" to="/profile">
            My Profile
          </Link>
        )}
      </span>
      <EditprofileModel
        ModalOpened={ModalOpened}
        setModalOpened={setModalOpened}
      />
    </div>
  );
}

ProfileCard.propTypes = {
  Postscount: PropTypes.string.isRequired,
  ProfilePage: PropTypes.string.isRequired,
};

export default React.memo(ProfileCard);
