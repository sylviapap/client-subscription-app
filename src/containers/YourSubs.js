import React, { Component } from "react";
import YourSubCard from "../components/YourSubCard.js"

class YourSubs extends Component {

  render() {
    const {subscriptions, handleClick} = this.props
    console.log(this.props.subscriptions)
    const data = !subscriptions
    console.log(data)
    return (
      <div className="ui segment inverted violet">
          <p>Your Subscriptions</p>
        <div className="ui four column grid">
          
            {data ? (<div className="row">
              {subscriptions.map(userSub => <YourSubCard sub={userSub} handleClick={handleClick}/>)}</div>) : null
            }
          
        </div>
      </div>
    );
  }
}

export default YourSubs;