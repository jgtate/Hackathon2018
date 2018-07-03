import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { NavLink } from 'react-router-dom'
import Home from './components/home';

import EnsIds from './components/EnsIds';
import EnsId from './components/EnsId';

import Drugs from './components/Drugs';
import Drug from './components/Drug';

import Diseases from './components/Diseases';
import Disease from './components/Disease';

class App extends Component {
  render() {
    return (
      <Router>
      <div>

      <NavLink to="/">Home</NavLink>
      <NavLink to="/diseases">Diseases</NavLink>
      <NavLink to="/genes">Genes</NavLink>
      <NavLink to="/drugs">Drugs</NavLink>
        <Route exact path="/" component={Home}/>
        <Route exact path="/genes" component={EnsIds}/>
        <Route path="/genes/:EnsId" component={EnsId}/>
        <Route exact path="/drugs" component={Drugs}/>
        <Route path="/drugs/:ChemblId" component={Drug}/>
        <Route exact path="/diseases" component={Diseases}/>
        <Route path="/diseases/:DiseaseId" component={Disease}/>
      </div>
      </Router>
    );
  }
}

export default App;
