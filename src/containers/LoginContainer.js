import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import SignUp from '../components/SignUp'
import Login from '../components/Login'
import api from '../services/api';

const API_ROOT = `http://localhost:3001/api/v1`;
const token = localStorage.getItem('token');
const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: token
};

class LoginContainer extends React.Component {
    state = {
        error: false,
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
                        username: this.state.fields.username, password: this.state.fields.password
                    } 
                })
        })
        .then(res => res.json())
        .then(user => this.login(user))
    };

    handleLoginSubmit = (e) => {
        e.preventDefault();
    
        api.auth.login(this.state.fields.username, this.state.fields.password).then((res) => {
          if (res.error) {
            this.setState({ error: true });
          } else {
            this.props.handleLogin(res);
            this.props.history.push('/');
          }
        });
      };

    login = (user) => {
        fetch(`${API_ROOT}/auth/`, {
              method: 'POST',
              headers: headers,
              body: JSON.stringify({ username: user.username, password: user.password })
          })
          .then(res => res.json());
      };
    
    render() {
        return (
            <div className="ui container">
                {this.state.error ? <h1>Error, please try again</h1> : null}
                <Switch>
                    <Route exact path="/" render={(routerProps) => <div>Sign Up<SignUp {...routerProps} fields={this.state.fields} handleSignUpSubmit={this.handleSignUpSubmit} handleChange={this.handleChange}/> or Log In <Login fields={this.state.fields} handleSubmit={this.handleLoginSubmit} handleChange={this.handleChange}/> </div>} />
                </Switch>
            </div>
        )
    }
}

export default LoginContainer;