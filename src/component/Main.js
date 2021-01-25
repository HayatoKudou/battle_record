import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  // Redirect,
} from 'react-router-dom';

import App from './App';
import Login from './auth/Login';
import Register from './auth/Register';
import Reset from './auth/Reset';
import UserSearch from './parts/UserSearch';
import BulletinBoard from './BulletinBoard';
import Auth from './auth/Auth';

export default class Main extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={BulletinBoard} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/reset" component={Reset} />
          <Route exact path="/register" component={Register} />
          <Auth>
            {/* ログイン必須ページ */}
            <Switch>
              <Route exact path="/logout" component={App} />
              <Route exact path="/profile" component={App} />
            </Switch>
          </Auth>
        </Switch>
      </Router>
    );
  }
}