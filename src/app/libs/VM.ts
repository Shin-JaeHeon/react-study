import {computed, observable} from 'mobx';

export default class VM<T> {

    @observable private _serviceSeparator: number = 0;

    constructor(private _service: T, private _service2: T = null) {
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

    setService(service: T, service2: T = null) {
        this._service = service;
        this._service2 = service2;
    }

    @computed get allService(): Array<T> {
        return [this._service, this._service2];
    }

}