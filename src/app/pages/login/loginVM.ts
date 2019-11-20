import {observable, computed} from "mobx";
import HttpClient from "../../libs/httpClient";
import UserService from '../../services/userService';

export default class LoginVM {

  static instance = new LoginVM();
  @observable private _email: string = '';
  @observable private _pw: string = '';

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

  login() {
    UserService.instance
      .action('login', this.email, this.pw)
      .then(() => HttpClient.updateHeaderByLogin());
  }

  @computed get isLogin(): boolean {
    return UserService.instance.isLogin;
  }
}