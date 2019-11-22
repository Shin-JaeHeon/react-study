import {observable, computed} from "mobx";
import Article from "app/models/articleModel";
import ArticleRequest from "../../requests/articleRequest";
import VM from '../../libs/VM';
import ArticleService from '../../services/articleService';

export default class EditorVM extends VM<ArticleService> {
  static instance: EditorVM;
  @observable private _id: string = '';
  @observable private _title: string = '';
  @observable private _description: string = '';
  @observable private _body: string = '';
  @observable private _tagList: Array<string> = [];
  @observable private _redirectID = '';
  @observable private _article: Article = null;

  constructor() {
    super(new ArticleService(), null);

  }

  load() {
    ArticleRequest.instance.loadArticle(this.id).then(article => {
      this.tagList = article.tags;
      this.title = article.title;
      this._body = article.article;
      this.description = article.description;
    });
  }

  update() {
    const article = {title: this.title, description: this.description, body: this.body, tagList: this.tagList};
    this.service.update(this.id, article)
      .then(() => this.redirectID = this.id)
      .catch(() => alert(`Update Failed!!`)
      );
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
    return this._tagList;
  }

  set tagList(value: Array<string>) {
    this._tagList = value;
  }

  addTag(value: string) {
    if (!this._tagList.includes(value)) this._tagList.push(value);
  }

  @computed get redirectID() {
    return this._redirectID;
  }

  set redirectID(value: string) {
    this._redirectID = value;
  }

  @computed get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  clearRedirectID() {
    this.redirectID = '';
  }

}
EditorVM.instance = new EditorVM();
