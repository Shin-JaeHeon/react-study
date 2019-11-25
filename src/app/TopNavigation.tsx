import React, {Fragment} from "react";
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
        return (
            <header>
                <Link className={style["app-title"]} to="/">conduit</Link>
                <div>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        {isLogin ?
                            <Fragment>
                                <li><Link to="/creator">New Post</Link></li>
                                <li><Link to="/settings">Settings</Link></li>
                                <li><Link to={`@${user.username}`}><img src={user.image} alt=""/>{user.username}
                                </Link></li>
                            </Fragment>
                            : <Fragment>
                                <li><Link to="/login">Sign in</Link></li>
                                <li>< Link to="/register">Sign up</Link></li>
                            </Fragment>
                        }
                    </ul>
                </div>
            </header>
        );
    }

}