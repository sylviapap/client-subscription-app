import React from 'react';

const AuthForm = props =>  {
  const { fields, handleSubmit, handleChange } = props;
    return (
        <form className="ui large form" onSubmit={handleSubmit}>
          <div className="ui stacked segment">
          <div className="ui field">
            <div className="ui left icon input">
              <i className="user icon"></i>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={fields.username}
              onChange={handleChange}
            />
            </div>
          </div>
          <div className="ui field">
          <div className="ui left icon input">
            <i className="lock icon"></i>            
              <input
              name="password"
              type="password"
              placeholder="Password"
              value={fields.password}
              onChange={handleChange}
            />
          </div>
          </div>
          </div>
          <button type="submit" className="ui fluid large teal submit button">
            Submit
          </button>
        </form>
      );
    }
  
  export default AuthForm;