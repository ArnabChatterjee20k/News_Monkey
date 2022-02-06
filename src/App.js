import React, { Component } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import LoadingBar from 'react-top-loading-bar'
export default class App extends Component {
  nav_items = [{ name: "Home", link: "/" }, { name: "Sports", link: "/sports" }, { name: "Business", link: "/business" }, { name: "Technology", link: "/technology" }, { name: "Science", link: "/science" }, { name: "entertainment", link: "/entertainment" }]
  pageSize = 10
  api_key = process.env.REACT_APP_API_KEY
  state = {
    progress : 0
  }
  setProgress = (progess)=>{
    console.log(this) 
    this.setState({progress:progess})
  }

  render() {
    return (
      <div>
        <Router>
          <Navbar list_items={this.nav_items} />
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
          />
          <Switch>
            <Route exact path="/"> {/*explicitly passing this route instead of loop as the key is different. */}
              <News api_key={this.api_key} setProgress={this.setProgress} pageSize={this.pageSize} key="general" requirement="top-headlines" country="in" category="general" />
            </Route>

            {this.nav_items.map(({ name, link }) => {
              return (
                <Route exact path={link} key={name}>
                  <News api_key={this.api_key} setProgress={this.setProgress} pageSize={this.pageSize} key={name} requirement="top-headlines" country="in" category={name} />
                </Route>
              )
            })}
          </Switch>
        </Router>
      </div>
    );
  }
}