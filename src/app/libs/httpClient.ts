import axios, {AxiosInstance} from 'axios';


export default class HttpClient {
  readonly axios: AxiosInstance;
  static httpClients = [];

  constructor(URL) {
    const baseURL = `https://conduit.productionready.io/api/${URL}`;
    this.axios = axios.create({baseURL});
    HttpClient.httpClients.push(this);
  }

  static updateHeaderByLogin(token) {
    HttpClient.httpClients.forEach(client => client.axios.defaults.headers = {
      authorization: `Token ${token}`
    });
  }
}