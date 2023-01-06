/* eslint-disable react/prop-types */
import React from 'react';
import './Posts.css';
import PropTypes from 'prop-types';
import Post from '../Post/Post';

function Posts({ PostsList }) {
  return (
    <div className="Posts">
      {
          PostsList.map((data) => (
            <Post data={data} />
          ))
        }
    </div>
  );
}

Posts.propTypes = {
  PostsList: PropTypes.string.isRequired,
};

export default React.memo(Posts);
