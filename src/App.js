import React, { Component } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
export default class App extends Component {
  render() {
    let nav_items = [{ name: "Sports", link: "/sports" }, { name: "Business", link: "/business" }, { name: "Technology", link: "/technology" }]
    return (
      <div>
        <Router>
          <Navbar list_items={nav_items} />
          {/* if category specified then we cant use everything.*/}
          {/* parameters we will be using in the url country and category */}
          <Switch>
            <Route exact path="/">
              <News pageSize={15} key="general" requirement="top-headlines" country="in" category="general"/>
            </Route>
            
            <Route exact path="/sports">
              <News pageSize={15} key="sports" requirement="top-headlines" country="in" category="sports"/>
            </Route>
            
            <Route exact path="/business">
              <News pageSize={15} key="business" requirement="top-headlines" country="in" category="business"/>
            </Route>
            
            <Route exact path="/technology">
              <News pageSize={15} key="technology" requirement="top-headlines" country="in" category="technology"/>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}