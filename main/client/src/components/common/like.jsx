import React from 'react';

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

export default Like;
