import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import AppContainer from './containers/AppContainer'
import LoginContainer from './containers/LoginContainer';
import SignUp from './components/SignUp'

class App extends Component {

  state = {
    company: "",
    cost: 0,
    auth: { 
      currentUser: {} 
    }
  }

  handleSubscriptionSubmit = event => {
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

  setUser = (user) => {
    this.setState({ auth: { currentUser: user } })
  }

  render() {
    return (
        <div id="content" className="App ui container">
            <Route
              path="/"
              render= { () => {
                return (!this.state.auth.currentUser ? <AppContainer /> : <LoginContainer setUser={this.setUser}/>)
              }}
            />
        </div>
    );
  }
}

export default App;