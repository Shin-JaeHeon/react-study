import React from 'react';
import * as style from './register.less';
import {observer} from 'mobx-react';
import TextInput from "../../widget/input/text-input";
import Button from "../../widget/input/button";
import RegisterVM from "./registerVM";
import {CommonStore} from "../../store/commonStore";
import {Redirect} from 'react-router-dom';

@observer
export default class Register extends React.Component {

  readonly vm = RegisterVM.instance;
  readonly handler = () => this.vm.register();
  readonly changed = name => event => this.vm[name] = event.target.value;

  render() {
    if (CommonStore.instance.isLogin) {
      return <Redirect to='/'/>
    }
    return (
      <div className={style.loginContainer}>
          <div>
          <div className={style.header}>
            <h1>Sign Up</h1>
            <span className={style["need-account"]}>Have an account?</span>
          </div>
          <div className={style.customForm}>
            <TextInput placeholder="username" onChange={this.changed('username')}/>
            <TextInput placeholder="Email" onChange={this.changed('email')}/>
            <TextInput type="password"  placeholder="Password" onChange={this.changed('pw')}/>
            <Button handler={this.handler}>Sign Up</Button>
          </div>
        </div>
      </div>
    )
  }
}