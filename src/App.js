import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import NavBar from './components/NavBar'
import {getCurrentUser} from './services/api';
import AppContainer from './containers/AppContainer'
import LoginContainer from './containers/LoginContainer'

class App extends Component {

  state = {
    auth: {},
    error: false, 
    message: ""
    }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      getCurrentUser()
      .then(resp => {
        if (resp.error) {
          console.log(resp.error)
          this.setState({ 
            error: true, 
            message: resp.error 
          });
          this.handleLogout();
        } else {
          console.log(resp)
          this.setState({ 
          auth: resp.user })
          }
        }
      )
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

  handleErrorClick = () => {
    console.log("clicked");
    this.setState({error: false})
  }

  render() {
    return (
    <Fragment>
      {this.state.error ? 
        <div className="ui warning message">
          <i className="close icon" onClick={this.handleErrorClick}></i>
          <div className="header">
            Error
          </div>
            <p>{this.state.message}</p>
            <p>Please log in or sign up</p>
          </div> 
          : 
          null}
          
      <Route
        path="/"
        render= { (routerProps) => {
          const loggedIn = !!this.state.auth.id;
            return (loggedIn ? 
              <Fragment>
              <NavBar {...routerProps} currentUser={this.state.auth} handleLogout={this.handleLogout}/>
              <AppContainer {...routerProps} currentUser={this.state.auth} subscriptions={this.state.subscriptions}/>
              </Fragment>
              : 
              <LoginContainer {...routerProps} handleLogin={this.handleLogin} handleSignUp={this.handleSignUp}/>
              )
            }
          }
        />
        </Fragment>

          )
        }
      }

export default App;