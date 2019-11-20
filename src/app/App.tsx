import React from 'react';
import './app.less';
import {Switch, Route, HashRouter} from 'react-router-dom';
import Main from './page/main/Main';
import TopNavigation from "./TopNavigation";
import Login from "./page/login/Login";
import Register from "./page/register/register";
import Article from "./page/article/Article";
import Creator from "./page/creator/Creator";
import Editor from "./page/editor/Editor";
import Settings from "./page/settings/Settings";
import Account from "./page/account/Account";

export default class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <TopNavigation/>
          <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route path="/creator" component={Creator}/>
            <Route path="/article/:id" component={Article}/>
            <Route path="/editor/:id" component={Editor}/>
            <Route path="/settings" component={Settings}/>
            <Route path="/@:username" component={Account}/>
            <Route exact path="/" component={Main}/>
          </Switch>
        </div>
      </HashRouter>
    )
  }
}