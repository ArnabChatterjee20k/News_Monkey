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
    let nav_items = [{name:"Home",link:"/"},{ name: "Sports", link: "/sports" }, { name: "Business", link: "/business" }, { name: "Technology", link: "/technology" },{name:"Science",link:"/science"}]
    return (
      <div>
        <Router>
          <Navbar list_items={nav_items} />
          {/* if category specified then we cant use everything.*/}
          {/* parameters we will be using in the url country and category */}
          <Switch>
            <Route exact path="/">
              <News pageSize={15} key="general" requirement="top-headlines" country="in" category="general" />
            </Route>

            {nav_items.map(({ name, link }) => {
              return (
                <Route exact path={link} key={name}>
                  <News pageSize={15} key={name} requirement="top-headlines" country="in" category={name} />
                </Route>
              )
            })}
          </Switch>
        </Router>
      </div>
    );
  }
}