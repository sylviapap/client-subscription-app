import React from 'react';

const Login = props => {
  const { fields, handleSubmit, handleChange} = props;
    return (
      <div className="ui form">
        <form onSubmit={handleSubmit}>
          <div className="ui field">
            <label>Username</label>
            <input
              name="username"
              placeholder="Username"
              value={fields.username}
              onChange={handleChange}
            />
          </div>
          <div className="ui field">
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={fields.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="ui basic purple button">
            Login
          </button>
        </form>
      </div>
  );
}
  
export default Login;