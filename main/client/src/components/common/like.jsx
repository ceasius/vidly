import React from 'react';
import PropTypes from 'prop-types';

const getLikeClasses = liked => {
  let badges = 'fa fa-lg fa-heart';
  return (badges += liked ? '' : '-o');
};
const Like = props => {
  return (
    <i
      className={getLikeClasses(props.liked)}
      onClick={props.onClick}
      style={{ cursor: 'pointer' }}
    />
  );
};

Like.propTypes = {
  liked: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

export default Like;
