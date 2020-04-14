import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const NavBar = props =>  {
  const { currentUser, history, handleLogout } = props;
  const loggedIn = !!currentUser.id;
    return (
      <div className="ui menu">
        <Link to="/subscriptions" className="item">
          Subscriptions
        </Link>
        {loggedIn ? (
          <div className="item">
            {`Welcome ${currentUser.username}`}
          </div>
        ) : null}
        {loggedIn ? (
          <a
            onClick={() => {
              history.push('/login');
              handleLogout();
            }}
            className="item"
          >
            <div className="ui purple button">Log Out</div>
          </a>
        ) : (
          <Link to="/login" className="item">
            <div className="ui purple button">Log In</div>
          </Link>
        )}
      </div>
    );
}

export default withRouter(NavBar);