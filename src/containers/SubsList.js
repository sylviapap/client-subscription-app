import React, { Component } from "react";
import SubCard from "../components/SubCard"

class SubsList extends Component {

  render() {
    const {subscriptions, handleClick, handleSubmit, handleChange} = this.props

    return (
      <div className="ui segment violet">
      <div className="ui four column grid">
      <form className="ui form" onSubmit={handleSubmit}>                
        <div className="ui field">
        <label>
            Company Name:
            <input name="company" type="text" placeholder="Company Name"
            onChange={handleChange}/>
        </label>
        </div>
        <div className="ui field">
        <label>
            Cost:
            <input name="cost" type="number" placeholder="0"
            onChange={handleChange}/>
        </label>             
        </div>
        <input name="submit" value="Add New Subscription" type="submit" className="ui basic purple button" />
            </form>
            <h2>Suggested Subscriptions</h2>

        <div className="row">
          {subscriptions.map(sub => <SubCard sub={sub} key={sub.id} handleClick={handleClick} />)}
        </div>
      </div>
      </div>
    )
  }
}

export default SubsList;