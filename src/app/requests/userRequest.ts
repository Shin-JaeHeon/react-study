import HttpClient from "../libs/httpClient";
import User from "../models/userModel";

export default class UserRequest extends HttpClient {
  static instance = new UserRequest();

  constructor() {
    super('users');
  }

  async requester(data: object, url = ''): Promise<User> {
    return new User((await this.axios.post(url, data)).data.user);
  }

  async login(email: string, password: string): Promise<User> {
    return this.requester({user: {email, password}}, 'login');
  }

  async register(username: string, email: string, password: string): Promise<User> {
    return this.requester({user: {username, email, password}});
  }
}