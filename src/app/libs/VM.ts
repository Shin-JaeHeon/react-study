import {observable, computed} from 'mobx';

export default class VM<T> {

  @observable private _serviceSeparator: number;

  constructor(private readonly _service: T, private readonly _service2: T = null) {
  }

  get serviceSeparator(): number {
    return this._serviceSeparator;
  }

  set serviceSeparator(value: number) {
    this._serviceSeparator = value;
  }

  @computed get service(): T {
    return !this._serviceSeparator ? this._service : (this._service2 ? this._service2 : this._service);
  };

  @computed get allService(): Array<T> {
    return [this._service, this._service2];
  }

}