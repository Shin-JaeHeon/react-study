import {observable, computed} from "mobx";
import ArticleRequest from "../../requests/articleRequest";

export default class CreatorVM {
  static instance: CreatorVM;
  @observable private _title: string;
  @observable private _description: string;
  @observable private _body: string;
  @observable private _tagList: Array<string>;
  @observable private _redirectID: string;

  constructor() {
    this._title = '';
    this._description = '';
    this._body = '';
    this._tagList = [];
    this._redirectID = '';
  }

  publish() {
    const {title, description, body, tagList} = this;
    ArticleRequest
      .instance
      .publish({title, description, body, tagList})
      .then(article => this.redirectID = article.id);
  }

  @computed get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  @computed get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  @computed get body(): string {
    return this._body;
  }

  set body(value: string) {
    this._body = value;
  }

  @computed get tagList(): Array<string> {
    return this._tagList || [];
  }

  set tagList(value: Array<string>) {
    this._tagList = value;
  }

  addTag(value: string) {
    if (!this.tagList.includes(value)) this._tagList.push(value);
  }

  @computed get redirectID() {
    return this._redirectID;
  }

  set redirectID(value: string) {
    this._redirectID = value;
  }

  clearRedirectID() {
    this.redirectID = '';
  }
}

CreatorVM.instance = new CreatorVM();