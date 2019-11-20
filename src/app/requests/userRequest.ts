import HttpClient from "../libs/httpClient";

export default class UserRequest extends HttpClient {
  static instance = new UserRequest();

  constructor() {
    super('users');
  }

  async login(email: string, password: string): Promise<Object> {
    return (await this.axios.post('login', {user: {email, password}})).data.user;
  }

  async register(username: string, email: string, password: string): Promise<Object> {
    return (await this.axios.post('', {user: {username, email, password}})).data.user;
  }
}