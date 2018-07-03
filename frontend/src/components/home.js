import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import DiseaseSearchBox from './DiseaseSearchBox'

const Home = () => {
  return (
    <div className="App">
      <DiseaseSearchBox
        onSelect={(item) => { console.log(item) } }
      />
    </div>
    )
}

export default Home;
