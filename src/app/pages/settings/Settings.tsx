import React from 'react';
import * as style from './Settings.less';
import {observer} from 'mobx-react';
import TextInput from "../../widget/input/text-input";
import Button from "../../widget/input/button";
import SettingsVM from "./settingsVM";
import {CommonStore} from "../../store/commonStore";
import {Redirect} from 'react-router-dom';

@observer
export default class Settings extends React.Component {
  readonly store = SettingsVM.instance;
  readonly changed = name => event => this.store[name] = event.target.value;
  readonly handler = () => this.store.update();

  readonly handleChange = (inputType: string, value: string) => {

  };

  componentDidMount() {
    if (CommonStore.instance.isLogin) this.store.initialize();
  }

  render() {
    if (!CommonStore.instance.isLogin) {
      return <Redirect to="/login"/>;
    }
    return (
      <div className={style.editorContainer}>
        <div className={style.customForm}>
          <h1>Your Settings</h1>
          <TextInput placeholder="URL of Picture"
                     onChange={this.changed('image')}
                     value={this.store.image}/>
          <TextInput placeholder="username"
                     onChange={this.changed('username')}
                     value={this.store.username}/>
          <textarea className={style.customTextArea}
                    placeholder="Short bio about you"
                    onChange={this.changed('bio')}
                    value={this.store.bio}/>
          <TextInput placeholder="Email"
                     type="email"
                     onChange={this.changed('email')}
                     value={this.store.email}/>
          <TextInput placeholder="New Password"
                     type="password"
                     onChange={this.changed('password')}
                     value={this.store.password}/>
          <Button handler={this.handler}>Update Settings</Button>
        </div>
      </div>
    )
  }
}