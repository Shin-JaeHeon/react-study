import React from 'react';
import * as style from './Settings.less';
import {observer} from 'mobx-react';
import TextInput from "../../widgets/input/text-input";
import Button from "../../widgets/input/button";
import SettingsVM from "./settingsVM";
import {Redirect} from 'react-router-dom';
import UserService from '../../services/userService';

@observer
export default class Settings extends React.Component {
  readonly vm = SettingsVM.instance;
  readonly changed = name => event => this.vm[name] = event.target.value;
  readonly handler = () => this.vm.update();

  componentDidMount() {
    if (UserService.instance.isLogin) this.vm.initialize();
  }

  render() {
    const {changed} = this;
    const {image, username, bio, email, password} = this.vm;
    if (!UserService.instance.isLogin) {
      return <Redirect to="/login"/>;
    }
    return (
      <div className={style.editorContainer}>
        <div className={style.customForm}>
          <h1>Your Settings</h1>
          <TextInput placeholder="URL of Picture"
                     onChange={changed} name="image"
                     value={image}/>
          <TextInput placeholder="username"
                     onChange={changed} name="username"
                     value={username}/>
          <textarea className={style.customTextArea}
                    placeholder="Short bio about you"
                    onChange={changed} name="bio"
                    value={bio}/>
          <TextInput placeholder="Email"
                     type="email"
                     onChange={changed} name="email"
                     value={email}/>
          <TextInput placeholder="New Password"
                     type="password"
                     onChange={changed} name="password"
                     value={password}/>
          <Button handler={this.handler}>Update Settings</Button>
        </div>
      </div>
    )
  }
}