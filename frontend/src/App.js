import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { NavLink } from 'react-router-dom'
import Home from './components/home';
import EnsIds from './components/EnsIds';
import EnsId from './components/EnsId';

class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <NavLink to="/genes">Genes</NavLink>
        <Route exact path="/" component={Home}/>
        <Route exact path="/genes" component={EnsIds}/>
        <Route path="/genes/:EnsId" component={EnsId}/>
      </div>
      </Router>
    );
  }
}

export default App;
