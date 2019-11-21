import {observable, computed} from 'mobx';

export default class VM<T> {

  @observable serviceSeparator: boolean;

  constructor(private readonly _service: T, private readonly _service2: T = null) {
  }


  @computed get service(): T {
    return !this.serviceSeparator ? this._service : (this._service2 ? this._service2 : this._service);
  };

  getAllService(): ReadonlyArray<T> {
    return [this._service, this._service2];
  }
}