import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home'
import About from './components/About'
import Login from './components/Login'
import NavBar from './components/NavBar'

const App = (props) => {
  return (
    <Router>
      <div className="app">
        <NavBar />
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/login" component={Login} />
      </div>
    </Router>
  );
};

export default App;
