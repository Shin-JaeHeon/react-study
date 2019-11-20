import Service from './Service';

export default class VM {

  serviceSeparator: boolean;

  constructor(private readonly _service: Service, private readonly _service2: Service = null) {
    this.serviceSeparator = false;
  }


  getService(): Service {
    return this.serviceSeparator ? this._service : (this._service2 ? this._service2 : this._service);
  };

  getAllService(): ReadonlyArray<Service> {
    return [this._service, this._service2];
  }
}