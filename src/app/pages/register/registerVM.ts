import {observable, computed} from "mobx";
import UserService from '../../services/userService';
import HttpClient from '../../libs/httpClient';

export default class RegisterVM {

  static instance = new RegisterVM();
  @observable private _email: string = '';
  @observable private _pw: string = '';
  @observable private _username: string = '';

  @computed get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  @computed get pw(): string {
    return this._pw;
  }

  set pw(value: string) {
    this._pw = value;
  }

  @computed get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  register() {
    UserService.instance
      .action('register', this.username, this.email, this.pw)
  }

  @computed get isLogin(): boolean {
    return UserService.instance.isLogin;
  }
}