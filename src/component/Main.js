import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
//   useLocation,
} from 'react-router-dom';

import App from './App';
import Login from './auth/Login';
import Register from './auth/Register';
import Reset from './auth/Reset';
import BulletinBoard from './BulletinBoard';
import Auth from './auth/Auth';
import User from './auth/User';

function usePageViews() {
    // let location = useLocation();
    if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
        User.set('device', 'smartphone');
    } else {
        User.set('device', 'pc');
    }

    var data = {
        user_id: JSON.parse(User.getLocalStorage('user')).id
    }
    fetch('http://battle_record_api/api/get_notice', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            console.log(response);
        } else {
            return response.json().then(data => {
                if('errors' in data){
                    console.log(data.errors);
                } else {
                    if('notice' in data){
                        User.setArr('notice', data.notice);
                    }
                }
            });
        }
    }).catch(error => {
        console.log(error);
    })
}

function RouterApp() {
    usePageViews();
    return (
        <Switch>
                <Route exact path="/" component={BulletinBoard} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/reset" component={Reset} />
                <Route exact path="/register" component={Register} />
            <Auth>
                {/* ログイン必須ページ */}
                <Switch>
                    <Route exact path="/logout" component={BulletinBoard} />
                    <Route exact path="/profile" component={App} />
                </Switch>
            </Auth>
        </Switch>
    );
}

export default class Main extends Component {
  render() {
    return (
        <Router>
            <RouterApp />
        </Router>
    );
  }
}