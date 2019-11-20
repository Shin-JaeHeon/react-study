import Service from './Service';
import {observable, computed} from 'mobx';

export default class VM<T extends Service = Service> {

  @observable serviceSeparator: boolean = false;
  _service: T;
  _service2: T;

  constructor(_service: T, _service2: T = null) {
    this._service = _service;
    this._service2 = _service2;
  }

  get getService(): T {
    return this.serviceSeparator ? this._service : (this._service2 ? this._service2 : this._service);
  };
}