import React from "react";
import * as style from './TopNavigation.less';
import {Link} from "react-router-dom";
import {observer} from "mobx-react";
import {observable} from "mobx";
import {CommonStore} from "./store/commonStore";

@observer
export default class TopNavigation extends React.Component {
  @observable readonly store = CommonStore.instance;

  render() {
    if (this.store.isLogin)
      return (
        <header>
          <div className={style["app-title"]}>
            <Link to="/">conduit</Link>
          </div>
          <div>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/creator">New Post</Link></li>
              <li><Link to="/settings">Settings</Link></li>
              <li><Link to={`@${this.store.user.username}`}><img src={this.store.user.image} alt=""/>{this.store.user.username}</Link></li>
            </ul>
          </div>
        </header>
      );
    else
      return (
        <header>
          <div className={style["app-title"]}>
            <Link to="/">conduit</Link>
          </div>
          <div>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/login">Sign in</Link></li>
              <li><Link to="/register">Sign up</Link></li>
            </ul>
          </div>
        </header>
      );
  }

}