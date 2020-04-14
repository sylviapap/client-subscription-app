import React, { Component } from 'react';

import SubsForm from './components/SubsForm'

class App extends Component {

  state = {
    company: "",
    cost: 0
  }

  handleSubmit = event => {
    event.preventDefault()
    
    fetch("http://localhost:3001/api/v1/subscriptions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        company: this.state.company,
        cost: this.state.cost
      })
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Successful post');
    })
    .catch((error) => {
      console.error('Error while post');
    });
  }

  handleName = event => {
    this.setState({
        company: event.target.value
    })
  }

  handleCost = event => {
    this.setState({
        cost: event.target.value
    })
  }

  render() {
    return (
      <div>
        <SubsForm handleSubmit={this.handleSubmit} handleName={this.handleName} handleCost={this.handleCost} />
      </div>
    );
  }
}

export default App;
