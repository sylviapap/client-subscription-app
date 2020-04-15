import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import SignUp from '../components/SignUp'

class LoginContainer extends React.Component {

    constructor() {
        super();
        this.state = {
          error: false,
          fields: {
              username: '',
              password: ''
          }
        };
      }

    handleChange = (e) => {
        const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
        this.setState({ fields: newFields });
      };

    loginOrSignUp = (e) => {
        e.preventDefault();
        const API_ROOT = `http://localhost:3001/api/v1`;
        fetch(`${API_ROOT}/users/`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
            Accept: 'application/json'},
            body: JSON.stringify({ user: {username: this.state.fields.username, password: this.state.fields.password} })
        })
        .then(res => res.json())
        .then(user => this.props.setUser(user))
    };
    
    render() {
        return (
            <div className="ui container">
                {this.state.error ? <h1>Error, please try again</h1> : null}
                <Switch>
                    <Route exact path="/" render={(routerProps) => <SignUp {...routerProps} fields={this.state.fields} loginOrSignUp={this.loginOrSignUp} handleChange={this.handleChange}/>} />
                </Switch>
            </div>
        )
    }
}

export default LoginContainer;