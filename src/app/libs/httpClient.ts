import axios, {AxiosInstance} from 'axios';
import {CommonStore} from "../store/commonStore";


export default class HttpClient {
  readonly axios: AxiosInstance;
  axiosAuthorized: AxiosInstance;
  static httpClients = [];

  constructor(URL) {
    const baseURL = `https://conduit.productionready.io/api/${URL}`;
    this.axios = axios.create({baseURL});
    this.axiosAuthorized = axios.create({baseURL});
    HttpClient.httpClients.push(this);
  }

  static updateHeaderByLogin() {
    HttpClient.httpClients.forEach(client => client.axiosAuthorized.defaults.headers = {
      authorization: `Token ${CommonStore.instance.user.token}`
    });
  }
}