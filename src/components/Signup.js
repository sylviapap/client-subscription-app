import React from 'react';
import api from '../services/api'

class Signup extends React.Component {
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
    
      handleSubmit = (e) => {
        e.preventDefault();
    
        const API_ROOT = `http://localhost:3001/api/v1`;
        fetch(`${API_ROOT}/users/`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
            Accept: 'application/json'},
            body: JSON.stringify({ username: this.state.fields.username, password: this.state.fields.password })
        })
        .then(res => res.json())
        .then((res) =>
              this.props.handleLogin(res));
    };

  
    render() {
      const { fields } = this.state;
  
      return (
        <div>
          {this.state.error ? <h1>Error, please try again</h1> : null}
          <div className="ui form">
            <form onSubmit={this.handleSubmit}>
              <div className="ui field">
                <label>Username</label>
                <input
                  name="username"
                  placeholder="Username"
                  value={fields.username}
                  onChange={this.handleChange}
                />
              </div>
              <div className="ui field">
                <label>Password</label>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={fields.password}
                  onChange={this.handleChange}
                />
              </div>
              <button type="submit" className="ui basic purple button">
                Sign Up!
              </button>
            </form>
          </div>
        </div>
      );
    }
  }
  
  export default Signup;