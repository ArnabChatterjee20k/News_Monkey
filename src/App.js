import React, { Component } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import News from './Components/News';

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <News pageSize={15} category="top-headlines" country="in"/>
      </div>
    );
  }
}