import React, { Component } from "react";
import UserSubCard from "../components/UserSubCard"

class YourSubs extends Component {

  render() {
    const {subscriptions, handleClick, handleEditClick} = this.props

    return (
      <div className="ui segment inverted teal">
          <h2>Your Subscriptions</h2>
        <div className="ui field">
          <div className="ui segment">
            {subscriptions.map(sub => <UserSubCard sub={sub} key={sub.id} handleEditClick={handleEditClick} handleClick={handleClick}/>)}
          </div>
        </div>
      </div>
    );
  }
}

export default YourSubs;