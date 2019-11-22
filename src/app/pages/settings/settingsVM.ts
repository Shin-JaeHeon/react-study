import {observable, computed} from "mobx";
import SettingsRequest from "../../requests/settingsRequest";
import UserService from '../../services/userService';

export default class SettingsVM {
  static instance = new SettingsVM();
  @observable private _email = '';
  @observable private _bio = '';
  @observable private _username = '';
  @observable private _image = '';
  @observable private _password = '';

  initialize() {
    const vm = UserService.instance;
    this.email = vm.user.email;
    this.image = vm.user.image;
    this.bio = vm.user.bio;
    this.username = vm.user.username;
  }

  update() {
    SettingsRequest
      .instance
      .update({image: this.image, username: this.username, bio: this.bio, email: this.email}, this.password)
      .then(user => {
        UserService.instance.user = user;
        alert('User data Updated');
      });
  }

  @computed get email() {
    return this._email;
  }

  set email(value) {
    this._email = value;
  }

  @computed get bio() {
    return this._bio;
  }

  set bio(value) {
    this._bio = value;
  }

  @computed get username() {
    return this._username;
  }

  set username(value) {
    this._username = value;
  }

  @computed get image() {
    return this._image;
  }

  set image(value) {
    this._image = value;
  }

  @computed get password() {
    return this._password;
  }

  set password(value) {
    this._password = value;
  }
}
