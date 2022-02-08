import React, { useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import LoadingBar from 'react-top-loading-bar'
export default function App () {
  const nav_items = [{ name: "Home", link: "/" }, { name: "Sports", link: "/sports" }, { name: "Business", link: "/business" }, { name: "Technology", link: "/technology" }, { name: "Science", link: "/science" }, { name: "entertainment", link: "/entertainment" }]
  const pageSize = 10
  const api_key = process.env.REACT_APP_API_KEY
  const [Loadingbar,setLoadingbar] = useState(0)

  const setProgress = (progess)=>{
    setLoadingbar(progess)
  }

    return (
      <div>
        <Router>
          <Navbar list_items={nav_items} />
          <LoadingBar
            color='#f11946'
            progress={Loadingbar}
          />
          <Switch>
            <Route exact path="/"> {/*explicitly passing this route instead of loop as the key is different. */}
              <News api_key={api_key} setProgress={setProgress} pageSize={pageSize} key="general" requirement="top-headlines" country="in" category="general" />
            </Route>

            {nav_items.map(({ name, link }) => {
              return (
                <Route exact path={link} key={name}>
                  <News api_key={api_key} setProgress={setProgress} pageSize={pageSize} key={name} requirement="top-headlines" country="in" category={name} />
                </Route>
              )
            })}
          </Switch>
        </Router>
      </div>
    );
}