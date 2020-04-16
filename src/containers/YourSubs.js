import React, { Component } from "react";
import YourSubCard from "../components/YourSubCard.js"

class YourSubs extends Component {

  render() {
    const {subscriptions, handleClick} = this.props
    console.log("hi", this.props.subscriptions)
    const data = !!subscriptions
    console.log(data)
    return ( data ? (
      <div className="ui segment inverted violet">
          <p>Your Subscriptions</p>
        <div className="ui four column grid">
          <div className="row">
            {subscriptions.map(sub => <YourSubCard subscription={sub} handleClick={handleClick}/>)}
          </div>
        </div>
      </div>) 
      : null
    );
  }
}

export default YourSubs;