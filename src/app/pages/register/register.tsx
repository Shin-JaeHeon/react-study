import React from 'react';
import * as style from './register.less';
import {observer} from 'mobx-react';
import TextInput from "../../widgets/input/text-input";
import Button from "../../widgets/input/button";
import RegisterVM from "./registerVM";
import {Redirect} from 'react-router-dom';
import {inputChanged} from '../../libs/lib';

@observer
export default class Register extends React.Component {

    readonly vm = RegisterVM.instance;
    readonly handler = () => this.vm.register();
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
                        <h1>Sign Up</h1>
                        <span className={style["need-account"]}>Have an account?</span>
                    </div>
                    <div className={style.customForm}>
                        <TextInput placeholder="username" onChange={changed} name="username"/>
                        <TextInput placeholder="Email" onChange={changed} name="email"/>
                        <TextInput type="password" placeholder="Password" onChange={changed} name="pw"/>
                        <Button handler={handler}>Sign Up</Button>
                    </div>
                </div>
            </div>
        )
    }
}