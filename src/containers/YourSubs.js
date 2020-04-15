import React, { Component } from "react";
import YourSubCard from "../components/SubCard.js"

class YourSubs extends Component {

  render() {
    const {subscriptions, handleClick} = this.props
    return (
      <div className="ui segment inverted violet">
          <p>Your Subscriptions</p>
        <div className="ui four column grid">
          <div className="row">
            {subscriptions.map(userSub => <YourSubCard sub={userSub.subscription_id} key={userSub.id} handleClick={handleClick}/>)}
          </div>
        </div>
      </div>
    );
  }
}

export default YourSubs;
