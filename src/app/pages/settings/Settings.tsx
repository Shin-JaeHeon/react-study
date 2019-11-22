import React from 'react';
import * as style from './Settings.less';
import {observer} from 'mobx-react';
import TextInput from "../../widget/input/text-input";
import Button from "../../widget/input/button";
import SettingsVM from "./settingsVM";
import {Redirect} from 'react-router-dom';
import UserService from '../../services/userService';

@observer
export default class Settings extends React.Component {
  readonly vm = SettingsVM.instance;
  readonly changed = name => event => this.vm[name] = event.target.value;
  readonly handler = () => this.vm.update();

  readonly handleChange = (inputType: string, value: string) => {

  };

  componentDidMount() {
    if (UserService.instance.isLogin) this.vm.initialize();
  }

  render() {
    if (!UserService.instance.isLogin) {
      return <Redirect to="/login"/>;
    }
    return (
      <div className={style.editorContainer}>
        <div className={style.customForm}>
          <h1>Your Settings</h1>
          <TextInput placeholder="URL of Picture"
                     onChange={this.changed('image')}
                     value={this.vm.image}/>
          <TextInput placeholder="username"
                     onChange={this.changed('username')}
                     value={this.vm.username}/>
          <textarea className={style.customTextArea}
                    placeholder="Short bio about you"
                    onChange={this.changed('bio')}
                    value={this.vm.bio}/>
          <TextInput placeholder="Email"
                     type="email"
                     onChange={this.changed('email')}
                     value={this.vm.email}/>
          <TextInput placeholder="New Password"
                     type="password"
                     onChange={this.changed('password')}
                     value={this.vm.password}/>
          <Button handler={this.handler}>Update Settings</Button>
        </div>
      </div>
    )
  }
}