import HttpClient from './httpClient';

export default abstract class Service {
  readonly request: HttpClient;
}