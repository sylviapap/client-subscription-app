import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar'
import api from './services/api';
import AppContainer from './containers/AppContainer'
import LoginContainer from './containers/LoginContainer'

const subscriptionsURL = "http://localhost:3001/api/v1/subscriptions"

class App extends Component {

  state = {
    company: "",
    cost: 0,
    recentSub: "",
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

  handleLogin = (resp) => {
    localStorage.setItem('token', resp.token);
    this.setState({ auth: resp.user } );
  }

  handleLogout = () => {
    localStorage.clear();    
    this.setState({ auth: {} });
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
              
              const loggedIn = !!this.state.auth.id;
              console.log(this.state.auth.id)

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