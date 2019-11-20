import {observable, computed} from "mobx";
import UserRequest from "../../requests/userRequest";
import {CommonStore} from "../../store/commonStore";

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
    UserRequest
      .instance
      .register(this.username, this.email, this.pw)
      .then(user => CommonStore.instance.user = user);
  }
}