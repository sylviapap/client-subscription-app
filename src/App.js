import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import AppContainer from './containers/AppContainer'
import LoginContainer from './containers/LoginContainer';
import NavBar from './components/NavBar';
import api from './services/api';

const subscriptionsURL = "http://localhost:3001/api/v1/subscriptions"

class App extends Component {

  state = {
    auth: {},
    subscriptions: []
  }

  componentDidMount() {
    fetch(subscriptionsURL)
      .then(resp => resp.json())
      .then(subData => this.setState({subscriptions: subData}))

    const token = localStorage.getItem('token');
    if (token) {
      api.auth.getCurrentUser()
      // .then(resp => console.log(resp))
        .then((user) => {
        this.setState({ 
          auth: {user} });
      });
    }
  }

  // componentWillUnmount() {
  //   localStorage.clear();
  // }

  handleLogin = (user) => {
    localStorage.setItem('token', user.token);
    this.setState({auth: {user}});
  };

  handleSignUp = (resp) => {
    localStorage.setItem('token', resp.token);
    this.setState({ auth: resp.user } );
  }

  handleLogout = () => {
    localStorage.clear();    
    this.setState({ auth: {} });
  };

  render() {
    return (
        <div id="content" className="App ui container">
          <Route
            path="/"
            render= { (routerProps) => {
              
              const loggedIn = !!this.state.auth.user;
              console.log(this.state.auth.user)

              return (loggedIn ? (<div><NavBar {...routerProps} currentUser={this.state.auth.user} handleLogout={this.handleLogout}/><AppContainer {...routerProps} currentUser={this.state.auth.user} subscriptions={this.state.subscriptions}/></div>) 
              
              : 
              
              <LoginContainer {...routerProps} handleLogin={this.handleLogin} handleSignUp={this.handleSignUp}/>)
            }}
          />
        </div>
    );
  }
}

export default App;