import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import AppContainer from './containers/AppContainer'
import LoginContainer from './containers/LoginContainer';

class App extends Component {

  state = {
    user: {}
  }

  setUser = (user) => {
    this.setState({ user: user })
  }

  render() {
    return (
        <div id="content" className="App ui container">
            <Route
              path="/"
              render= { () => {
                return (this.state.user.id ? <AppContainer /> : <LoginContainer setUser={this.setUser}/>)
              }}
            />
        </div>
    );
  }
}

export default App;