import React from 'react';

const API_ROOT = `http://localhost:3001/api/v1`;
const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
};

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
          error: false,
          fields: {
            username: '',
            password: '',
          },
        };
      }
    
      handleChange = (e) => {
        const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
        this.setState({ fields: newFields });
      };
    
      handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${API_ROOT}/users`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ username: this.state.fields.username, password: this.state.fields.password })
          })
          .then((res) => {
          if (res.error) {
            this.setState({ error: true });
          } else {
              this.setState({fields: {
                username: '',
                password: '',
              }})
          }
        });
      };
  
    render() {
      const { fields } = this.state;
  
      return (
        <div>
          {this.state.error ? <h1>Try Again</h1> : null}
          <div className="ui form">
            <form onSubmit={this.handleSubmit}>
              <div className="ui field">
                <label>Username</label>
                <input
                  name="username"
                  placeholder="username"
                  value={fields.username}
                  onChange={this.handleChange}
                />
              </div>
              <div className="ui field">
                <label>Password</label>
                <input
                  name="password"
                  type="password"
                  placeholder="password"
                  value={fields.password}
                  onChange={this.handleChange}
                />
              </div>
              <button type="submit" className="ui basic green button">
                Login
              </button>
            </form>
          </div>
        </div>
      );
    }
  }
  
  export default Login;