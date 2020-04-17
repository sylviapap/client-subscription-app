import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm'
import api from '../services/api';

const API_ROOT = `http://localhost:3001/api/v1`;

class LoginContainer extends React.Component {
  state = {
      error: false,
      message: "",
      fields: {
          username: '',
          password: ''
        }
      }

  handleChange = (e) => {
      const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
      this.setState({ fields: newFields });
    };

  handleSignUpSubmit = (e) => {
      e.preventDefault();
      fetch(`${API_ROOT}/users/`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'},
          body: JSON.stringify({ 
              user: {
                  username: this.state.fields.username, 
                  password: this.state.fields.password
              } 
          })
      })
      .then(res => res.json())
      .then(res => {
          if (res.errors) {
            console.log(res.errors);
            this.setState({ 
              error: true, 
              message: res.errors, 
              fields: {
                username: '',
                password: ''
              } 
            });
            localStorage.clear();
          } else {
            // console.log(res)
            this.props.handleLogin(res);
            this.props.history.push('/');
          }}
      )
  }

  handleLoginSubmit = (e) => {
      e.preventDefault();
      api.auth.login(this.state.fields.username, this.state.fields.password)
      .then((res) => {
        if (res.error) {
          console.log(res.error)
          this.setState({ 
            error: true, 
            message: res.error, 
            fields: {
              username: '',
              password: ''
            } 
          });
          localStorage.clear();
        } else {
          console.log(res)
          this.props.handleLogin(res);
          this.props.history.push('/');
        }
      });
    }

  handleErrorClick = () => {
    console.log("clicked");
    this.setState({error: false})
  }
  
  render() {
    return (
      <div className="ui center aligned middle aligned container">
        {this.state.error ? 
        <div className="ui warning message">
          <i className="close icon" onClick={this.handleErrorClick}></i>
          <div className="header">
            Error
          </div>
          <p>{this.state.message}</p>
          <p>Please try again or create account</p>
        </div> 
          : 
          null}
          <Switch>
              <Route exact path="/" render={() => 
                <div className="column">
                  <h2 className="ui header">
                    <div className="content">
                    Subscribr
                    <div className="sub header">Login with existing username and password
                    </div>
                    </div>
                  </h2>
                  <form className="ui large form">
                    <AuthForm 
                    fields={this.state.fields} 
                    handleSubmit={this.handleLoginSubmit} 
                    handleChange={this.handleChange}
                  />
                  </form>                   
                <div className="ui message"><p>Need an account?</p>
                  <Link to="/signup" onClick={this.handleErrorClick}>Sign Up Here</Link>
                </div>
                </div>                
                } />
              
              <Route exact path="/signup" render={() =>
              <div className="column">
              <h2 class="ui icon header">
                  <i class="user circle outline icon"></i>
                  <div class="content">
                    Sign Up
                    <div class="sub header">Enter a new username (must be unique) and password
                    </div>
                  </div>
                </h2>
                <form className="ui form">
                  <AuthForm 
                    fields={this.state.fields} 
                    handleSubmit={this.handleSignUpSubmit} 
                    handleChange={this.handleChange}
                  />
              </form>
              </div>} 
              />
          </Switch>
      </div>
    )
  }
}

export default LoginContainer;