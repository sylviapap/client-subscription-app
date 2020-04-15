import React from 'react';
import { withRouter } from 'react-router-dom';

const NavBar = props =>  {
  const { currentUser, handleLogout } = props;
  const loggedIn = !!currentUser.id;
    return (
      <div className="ui menu">
        {loggedIn ? (
          <div className="item">
            {`Welcome, ${currentUser.username}`}
          </div>
        ) : null}
        {loggedIn ? (
            <div className="ui purple button" onClick={() => {
              props.history.push('/');
              handleLogout();
            }}>Log Out</div>
        ) : null}
      </div>
    )
}

export default withRouter(NavBar);