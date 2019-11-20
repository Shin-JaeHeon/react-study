import React from 'react';
import * as style from './login.less';
import {observer} from 'mobx-react';
import TextInput from "../../widget/input/text-input";
import Button from "../../widget/input/button";
import loginVM from "./loginVM";
import {Redirect} from 'react-router-dom';

// accc@a.cccccccom 12345678

@observer
export default class Login extends React.Component {
  readonly store = loginVM.instance;
  readonly handler = () => this.store.login();
  readonly changed = name => event => this.store[name] = event.target.value;

  render() {
    if (this.store.isLogin) {
      return <Redirect to='/'/>
    }
    return (
      <div className={style.loginContainer}>
        <div>
          <div className={style.header}>
            <h1>Sign In</h1>
            <span className={style["need-account"]}>Need an account?</span>
          </div>
          <div className={style.customForm}>
            <TextInput placeholder="Email" onChange={this.changed('email')}/>
            <TextInput placeholder="Password" type="password" onChange={this.changed('pw')}/>
            <Button handler={this.handler}>Sigin in</Button>
          </div>
        </div>
      </div>
    )
  }
}