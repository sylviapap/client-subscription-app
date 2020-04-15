import React from 'react';

class Home extends React.Component {
  componentDidMount() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.props.history.push('/login');
    }

    fetch("http://localhost:3001/api/v1/subscriptions")
    .then(res => res.json())
    .then(subs => console.log(subs))
  }

  render() {
    return (
      <div className="ui container">
        <h1>Home</h1>
        <div className="subs container">

        </div>
      </div>
    );
  }
}

export default Home;