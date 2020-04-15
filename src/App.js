import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home'
import SignUp from './components/SignUp'
import Login from './components/Login'
import NavBar from './components/NavBar'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import api from './services/api';

class App extends Component {

  state = {
    company: "",
    cost: 0,
    recentSub: "",
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

  // componentWillUnmount() {
  //   localStorage.clear();
  // }

  handleLogin = (user) => {
    const currentUser = { currentUser: user };
    localStorage.setItem('token', user.token);
    this.setState({ auth: currentUser });
  };

  handleLogout = () => {
    localStorage.removeItem('token');
    this.setState({ auth: { currentUser: {} } });
  };

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
    .then((sub) => {
      this.setState({recentSub: sub})
      console.log(this.state.auth.currentUser)
    })    

    fetch("http://localhost:3001/api/v1/user_subscriptions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({      
        subscription_id: this.state.recentSub.id
      })
    })
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
        <div id="content" className="App ui container">
            <Route
              path="/"
              render= { (routerProps) => {
                const loggedIn = !!this.state.auth.currentUser.id;
                return (loggedIn ? (<div><NavBar {...routerProps} currentUser={this.state.auth.currentUser} handleLogout={this.handleLogout}/><AppContainer {...routerProps} currentUser={this.state.auth.currentUser}/></div>) : <LoginContainer {...routerProps} handleLogin={this.handleLogin} />)
              }}
            />
            {/* <AppContainer /> */}
        </div>
    );
  }
}

export default App;