import {computed, observable} from "mobx";
import User from "../models/userModel";

class CommonStoreInternal {
  @observable private _user: User = null;

  @computed get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  @computed get isLogin(): boolean {
    return !!this.user;
  }
}

export namespace CommonStore {
  export const instance = new CommonStoreInternal();
}
