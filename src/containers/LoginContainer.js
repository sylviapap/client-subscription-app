import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm'
import api from '../services/api';

const API_ROOT = `http://localhost:3001/api/v1`;

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
                    username: this.state.fields.username, 
                    password: this.state.fields.password
                } 
            })
        })
        .then(res => res.json())
        .then(res => {
            if (res.error) {
              this.setState({ error: true });
            } else {
              console.log(res)
              this.props.handleSignUp(res);
              this.props.history.push('/');
            }}
        )
    }

    handleLoginSubmit = (e) => {
        e.preventDefault();
        api.auth.login(this.state.fields.username, this.state.fields.password).then((res) => {
          if (res.error) {
            this.setState({ error: true });
          } else {
            console.log(res)
            this.props.handleLogin(res);
            this.props.history.push('/');
          }
        });
      };
    
    render() {
        return (
            <div className="ui container">
                {this.state.error ? <h1>Error, please try again</h1> : null}
                <Switch>
                    <Route exact path="/" render={() => <div>Log In <AuthForm fields={this.state.fields} handleSubmit={this.handleLoginSubmit} handleChange={this.handleChange}/> <Link to="/signup">Create Account</Link></div>} />
                    <Route path="/signup" render={() =>
                        <AuthForm fields={this.state.fields} handleSubmit={this.handleSignUpSubmit} handleChange={this.handleChange}/>} />
                </Switch>
            </div>
        )
    }
}

export default LoginContainer;