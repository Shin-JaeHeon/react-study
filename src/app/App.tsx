import React from 'react';
import './app.less';
import {Switch, Route, HashRouter} from 'react-router-dom';
import Main from './pages/main/Main';
import TopNavigation from "./TopNavigation";
import Login from "./pages/login/Login";
import Register from "./pages/register/register";
import Article from "./pages/article/Article";
import Creator from "./pages/creator/Creator";
import Editor from "./pages/editor/Editor";
import Settings from "./pages/settings/Settings";
import Account from "./pages/account/Account";
import {observer} from 'mobx-react';

@observer
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