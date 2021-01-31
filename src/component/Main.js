import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
//   useLocation,
} from 'react-router-dom';
import { serverUrl } from '../common';

import App from './App';
import Login from './auth/Login';
import Register from './auth/Register';
import Reset from './auth/Reset';
import BulletinBoard from './page/BulletinBoard';
import MenuAppBar from './parts/header';
import Auth from './auth/Auth';
import User from './auth/User';
import {webpush} from '../webpush';
import Contact from './page/contact';

function usePageViews() {

    // const title    = '見出し';
    // const options  = {
    //     body : '本文',
    //     data : {
    //       foo : '任意のデータ'
    //      }
    // };
    // webpush(title, options);

    //デバイスの登録
    if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
        User.set('device', 'smartphone');
    } else {
        User.set('device', 'pc');
    }

    var data = {
        user_id: User.isLoggedIn() ? JSON.parse(User.getLocalStorage('user')).id  : localStorage.getItem("user") === null ? null : JSON.parse(User.getLocalStorage('user')).id,
    }
    fetch(serverUrl + '/api/get_notice', {
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
                <Route exact path="/" component={MenuAppBar} />
                <Route exact path="/apex" component={MenuAppBar} />
                <Route exact path="/apex/update" component={MenuAppBar} />
                <Route exact path="/apex/charactor" component={MenuAppBar} />
                <Route exact path="/apex/weapon" component={MenuAppBar} />
                <Route exact path="/apex/bulletin_board" component={MenuAppBar} />
                <Route exact path="/apex/contact" component={MenuAppBar} />

                <Route exact path="/login" component={Login} />
                <Route exact path="/reset" component={Reset} />
                <Route exact path="/register" component={Register} />
            <Auth>
                {/* ログイン必須ページ */}
                <Switch>
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