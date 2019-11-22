import {observable, computed} from "mobx";
import VM from '../../libs/VM';
import ArticleService from '../../services/articleService';
import Article from '../../models/articleModel';

export default class CreatorVM extends VM<ArticleService> {
  static instance: CreatorVM;
  @observable private _redirectID: string;

  constructor() {
    super(new ArticleService());
    this.redirectID = '';
  }

  publish() {
    this.service
      .publish()
      .then(article => this.redirectID = article.id);
  }

  @computed get article(): Article {
    return this.service.article;
  }

  @computed get title(): string {
    return this.article.title;
  }

  set title(value: string) {
    this.article.title = value;
  }

  @computed get description(): string {
    return this.article.description;
  }

  set description(value: string) {
    this.article.description = value;
  }

  @computed get body(): string {
    return this.article.body;
  }

  set body(value: string) {
    this.article.body = value;
  }

  @computed get tagList(): Array<string> {
    return this.article.tagList || [];
  }

  set tagList(value: Array<string>) {
    this.article.tagList = value;
  }

  addTag(value: string) {
    if (!this.article.tagList.includes(value))
      this.article.tagList.push(value);
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