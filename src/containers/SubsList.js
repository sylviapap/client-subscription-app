import React, { Component } from "react";
import SubCard from "../components/SubCard"

class SubsList extends Component {

  render() {
    const {subscriptions, handleClick, handleSubmit, handleChange} = this.props

    return (
      <div className="ui segment teal">
        <h2>Companies</h2>
        <div className="ui field">
          {subscriptions.map(sub => <SubCard sub={sub} key={sub.id} handleClick={handleClick} />)}
        </div>
        <h2>Add to Company List</h2>
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
        <input name="submit" value="Add" type="submit" className="ui teal button" />
      </form>
      </div>
    )
  }
}

export default SubsList;