import React from 'react';
import { withRouter } from 'react-router-dom';

const NavBar = props =>  {
  const { currentUser, handleLogout } = props;
    return (
      <div className="ui two item menu">
        <div className="item">
          {`Welcome, ${currentUser.username}`}
        </div>
        <div className="item">
          <button onClick={() => {
          props.history.push('/');
          handleLogout();
        }} className="ui purple button">Log Out</button>
        </div>
      </div>
    )
}

export default withRouter(NavBar);