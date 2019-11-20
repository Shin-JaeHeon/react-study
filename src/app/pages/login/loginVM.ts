import {observable, computed} from "mobx";
import {CommonStore} from "../../store/commonStore";
import UserRequest from "../../requests/userRequest";
import HttpClient from "../../libs/httpClient";

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
    UserRequest.instance
      .login(this.email, this.pw)
      .then(user => {
        CommonStore.instance.user = user;
        HttpClient.updateHeaderByLogin();
      });
  }

  @computed get isLogin(): boolean {
    return CommonStore.instance.isLogin;
  }
}