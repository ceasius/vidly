import React from 'react';

const NavBar = props => {
  const { totalCounters } = props;
  return (
    <nav className="navbar navbar-dark bg-dark">
      <span className="navbar-brand">
        {'Counter App '}
        <span className="badge badge-pill badge-secondary">
          {totalCounters}
        </span>
      </span>
    </nav>
  );
};

export default NavBar;
