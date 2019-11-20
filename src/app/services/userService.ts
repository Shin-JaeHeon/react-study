import Service from '../libs/Service';
import UserRequest from '../requests/userRequest';
import {observable, action, computed} from 'mobx';
import User from '../models/userModel';

export default class UserService extends Service {

  static instance = new UserService();
  readonly request: UserRequest;
  @observable email: string;
  @observable password: string;
  @observable username: string;
  @observable user: User;

  constructor() {
    super();
    this.request = UserRequest.instance;
  }

  @action
  async action(type: string, ...args) {
    this.user = new User(await this.request[type](...args));
  }

  @computed get isLogin(): boolean {
    return !!this.user;
  }
}