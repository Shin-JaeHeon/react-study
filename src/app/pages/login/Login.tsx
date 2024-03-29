import React from 'react';
import * as style from './login.less';
import {observer} from 'mobx-react';
import TextInput from "../../widgets/input/text-input";
import Button from "../../widgets/input/button";
import loginVM from "./loginVM";
import {Redirect} from 'react-router-dom';
import {inputChanged} from '../../libs/lib';

// accc@a.cccccccom 12345678

@observer
export default class Login extends React.Component {
    readonly vm = loginVM.instance;
    readonly handler = () => this.vm.login();
    readonly changed = inputChanged(this.vm);

    render() {
        const {changed, vm, handler} = this;
        if (vm.isLogin) {
            return <Redirect to="/"/>
        }
        return (
            <div className={style.loginContainer}>
                <div>
                    <div className={style.header}>
                        <h1>Sign In</h1>
                        <span className={style["need-account"]}>Need an account?</span>
                    </div>
                    <div className={style.customForm}>
                        <TextInput placeholder="Email" onChange={changed} name="email"/>
                        <TextInput placeholder="Password" type="password" onChange={changed} name="pw"/>
                        <Button handler={handler}>Sigin in</Button>
                    </div>
                </div>
            </div>
        )
    }
}