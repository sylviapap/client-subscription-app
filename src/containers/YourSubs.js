import React, { Component } from "react";
import SubCard from "../components/SubCard.js"

class YourSubs extends Component {

  render() {
    const {subscriptions, handleClick} = this.props
    return (
      <div className="ui segment inverted violet">
          <p>Your Subscriptions</p>
        <div className="ui four column grid">
          <div className="row">
            {subscriptions.map(sub => <SubCard sub={sub} key={sub.id} handleClick={handleClick}/>)}
          </div>
        </div>
      </div>
    );
  }
}

export default YourSubs;
