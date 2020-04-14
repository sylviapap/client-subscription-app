import React, { Component } from 'react';
import './App.css';
import Home from './components/Home'
import SignUp from './components/Signup'
import Login from './components/Login'
import NavBar from './components/NavBar'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import api from './services/api';

import SubsForm from './components/SubsForm'

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

    if (!!token) {
      api.auth.getCurrentUser().then((user) => {
        const currentUser = { currentUser: user };
        this.setState({ auth: currentUser });
      });
    }
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
      <div className="App ui container">
        <NavBar
          currentUser={this.state.auth.currentUser}
          handleLogout={this.handleLogout}
        />
        
        <SubsForm handleSubmit={this.handleSubmit} handleName={this.handleName} handleCost={this.handleCost} />  
        
        <div id="content" className="ui container">
          <Switch>
            <Route
              path="/login"
              render={(routerProps) => {
                return <Login {...routerProps} handleLogin={this.handleLogin} />;
              }}
            />
            <Route
              path="/signup"
              render={(routerProps) => {
                return <SignUp {...routerProps} handleLogin={this.handleLogin} />;
              }}
            />
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route
              path="/"
              render={() => {
                const loggedIn = !!this.state.auth.currentUser.id;

                return loggedIn ? <Home /> : <Redirect to="/login" />;
              }}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;