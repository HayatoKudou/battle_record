import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  // Redirect,
} from 'react-router-dom';

import App from './App';
import Login from './auth/Login';
// import Logout from './Logout';
import Ranking from './Ranking';
import Auth from './auth/Auth';
// import User from './User';

export default class Main extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Ranking} />
          <Route exact path="/app" component={App} />
          <Route exact path="/login" component={Login} />
          {/* <Route exact path="/logout" component={Logout} /> */}
          <Auth>
            <Switch>
              {/* <Route exact path="/list1" component={List1} />
              <Route exact path="/list2" component={List2} />
              <Redirect from="/" to="/List1" /> */}
            </Switch>
          </Auth>
        </Switch>
      </Router>
    );
  }
}