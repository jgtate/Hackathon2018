import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import GeneSearchBox from './GeneSearchBox'

const Home = () => {
  return (
    <div className="App">
    <GeneSearchBox onSelect={(item) => { console.log(item) } }/>
    </div>
    )
}

export default Home;