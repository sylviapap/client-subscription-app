import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const loggedIn = !!this.props.currentUser.id;

    return (
      <div className="ui menu">
        <Link to="/subscriptions" className="item">
          Subscriptions
        </Link>
        {loggedIn ? (
          <div className="item">
            {`Welcome ${this.props.currentUser.username}`}
          </div>
        ) : null}
        {loggedIn ? (
          <a
            onClick={() => {
              this.props.history.push('/login');
              this.props.handleLogout();
            }}
            className="item"
          >
            <div className="ui primary button">Log Out</div>
          </a>
        ) : (
          <Link to="/login" className="item">
            <div className="ui primary button">Log In</div>
          </Link>
        )}
      </div>
    );
  }
}

export default withRouter(NavBar);