import HttpClient from "../libs/httpClient";
import User from "../models/userModel";

export default class UserRequest extends HttpClient {
  static instance = new UserRequest();

  constructor() {
    super('users');
  }

  async login(email: string, password: string): Promise<User> {
    return (await this.axios.post('', {email, password})).data.user;
  }

  async register(username: string, email: string, password: string): Promise<User> {
    return (await this.axios.post('', {user: {username, email, password}})).data.user;
  }
}