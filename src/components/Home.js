import React from 'react';

class Home extends React.Component {
  componentDidMount() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.props.history.push('/login');
    }
  }

  render() {
    return (
      <div className="ui container">
        <h1>Home</h1>
      </div>
    );
  }
}

export default Home;