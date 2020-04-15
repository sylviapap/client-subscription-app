import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import AppContainer from './containers/AppContainer'
import LoginContainer from './containers/LoginContainer';
import NavBar from './components/NavBar';
import api from './services/api';

class App extends Component {

  state = {
    company: "",
    cost: 0,
    auth: { 
      currentUser: {} 
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      api.auth.getCurrentUser()
        .then((user) => {
        const currentUser = { currentUser: user };
        this.setState({ auth: currentUser });
      });
    }
  }

  // type localstorage in console to check

  componentWillUnmount() {
    localStorage.clear();
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
  
  handleLogin = (user) => {
    const currentUser = { currentUser: user };
    localStorage.setItem('token', user.token);
    this.setState({ auth: currentUser });
  };

  handleLogout = () => {
    localStorage.removeItem('token');
    this.setState({ auth: { currentUser: {} } });
  };

  render() {
    return (
        <div id="content" className="App ui container">
            <Route
              path="/"
              render= { (routerProps) => {
                const loggedIn = !!this.state.auth.currentUser.id;
                return (loggedIn ? (<div><NavBar {...routerProps} currentUser={this.state.auth.currentUser} handleLogout={this.handleLogout}/><AppContainer {...routerProps} /></div>) : <LoginContainer {...routerProps} handleLogin={this.handleLogin} handleLogout={this.handleLogout} />)
              }}
            />
        </div>
    );
  }
}

export default App;