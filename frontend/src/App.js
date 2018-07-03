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
        <Route exact path="/" component={Home}/>
        <NavLink to="/genes">Genes</NavLink>
        <Route exact path="/genes" component={EnsIds}/>
        <Route path="/genes/:EnsId" component={EnsId}/>

        <NavLink to="/drugs">Drugs</NavLink>
        <Route exact path="/drugs" component={Drugs}/>
        <Route path="/drugs/:ChemblId" component={Drug}/>

        <NavLink to="/diseases">Diseases</NavLink>
        <Route exact path="/diseases" component={Diseases}/>
        <Route path="/diseases/:DiseaseId" component={Disease}/>
      </div>
      </Router>
    );
  }
}

export default App;
