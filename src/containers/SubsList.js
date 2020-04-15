import React, { Component } from "react";
import SubCard from "../components/SubCard"

class SubsList extends Component {

  render() {
    const {subscriptions, handleClick} = this.props
    console.log(subscriptions.length)
    return (
      <div className="ui segment violet">
        <p>All Subscriptions</p>
      <div className="ui four column grid">
        <div className="row">
          {subscriptions.map(sub => <SubCard sub={sub} key={sub.id} handleClick={handleClick} />)}
        </div>
      </div>
      </div>
    )
  }
}

export default SubsList;