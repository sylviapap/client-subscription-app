import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import AppContainer from './containers/AppContainer'
import LoginContainer from './containers/LoginContainer';

class App extends Component {

  state = {
    auth: { 
      currentUser: {} 
    }
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
                return (this.state.auth.currentUser.id ? <AppContainer /> : <LoginContainer setUser={this.setUser}/>)
              }}
            />
        </div>
    );
  }
}

export default App;