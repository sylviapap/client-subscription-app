import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar'
import api from './services/api';
import AppContainer from './containers/AppContainer'
import LoginContainer from './containers/LoginContainer'

class App extends Component {

  state = {
    auth: {}
    }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      api.auth.getCurrentUser()
      // .then(res => console.log(res))
        .then((resp) => {
        this.setState({ 
          auth: resp.user });
      });
    }
  }

  handleLogin = (resp) => {
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
              
              const loggedIn = !!this.state.auth.id;

              return (loggedIn ? (<div><NavBar {...routerProps} currentUser={this.state.auth} handleLogout={this.handleLogout}/><AppContainer {...routerProps} currentUser={this.state.auth} subscriptions={this.state.subscriptions}/></div>) 
              
              : 
              
              <LoginContainer {...routerProps} handleLogin={this.handleLogin} handleSignUp={this.handleSignUp}/>)
            }}
          />
        </div>
    );
  }
}

export default App;