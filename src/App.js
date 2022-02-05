import React, { Component } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import News from './Components/News';

export default class App extends Component {
  render() {
    let nav_items = [{ name: "Sports", link: "/sports" }, { name: "Business", link: "/business" }, { name: "Entertainment", link: "/entertainment" }]
    return (
      <div>
        <Navbar list_items={nav_items}/>
        {/* if category specified then we cant use everything.*/}
        {/* parameters we will be using in the url country and category */}
        <News pageSize={15} requirement="top-headlines" country="in" category="sports" />
      </div>
    );
  }
}