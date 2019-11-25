import React from "react";
import * as style from './TopNavigation.less';
import {Link} from "react-router-dom";
import {observer} from "mobx-react";
import {observable} from "mobx";
import UserService from './services/userService';

@observer
export default class TopNavigation extends React.Component {
    @observable readonly service = UserService.instance;

    render() {
        const {isLogin, user} = this.service;
        if (this.service.isLogin)
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
                            <li><Link to={`@${user.username}`}><img src={user.image} alt=""/>{user.username}</Link></li>
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