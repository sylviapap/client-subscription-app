import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const NavBar = props =>  {
  const { currentUser, handleLogout } = props;
  const loggedIn = !!currentUser.id;
    return (
      <div className="ui menu">
        {loggedIn ? (
          <div className="item">
            {`Welcome ${currentUser.username}`}
          </div>
        ) : null}
        {loggedIn ? (
          <a
            onClick={() => {
              props.history.push('/');
              handleLogout();
            }}
            className="item"
          >
            <div className="ui purple button">Log Out</div>
          </a>
        ) : null}
      </div>
    )
}

export default withRouter(NavBar);