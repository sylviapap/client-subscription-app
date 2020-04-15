import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const NavBar = () =>  {
    return (
      <div className="ui menu">
        <Link to="/subscriptions" className="item">
          Subscriptions
        </Link>
        <Link to="/login" className="item">
          <div className="ui purple button">Log In</div>
        </Link>
      </div>
    )
}

export default withRouter(NavBar);