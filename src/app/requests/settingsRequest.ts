import HttpClient from "../libs/httpClient";
import User from "../models/userModel";
import {CommonStore} from "../store/commonStore";

export default class SettingsRequest extends HttpClient {
  static instance = new SettingsRequest();

  constructor() {
    super('user');
  }

  async update(user: object, password = null): Promise<User> {
    return new User((await this.axiosAuthorized.put('',  password ? {user: {...user, password}} : {user})).data.user);
  }
}