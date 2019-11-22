import {computed, observable} from "mobx";
import ArticleRequest from '../requests/articleRequest';
import {DraftFeed} from '../interface';
import Article from '../models/articleModel';
import Service from '../libs/Service';

export default class ArticleService extends Service {
  request: ArticleRequest;
  @observable private _article: Article;


  constructor() {
    super();
    this.request = ArticleRequest.instance;
  }

  @computed get article(): Article {
    return this._article;
  }

  set article(value: Article) {
    this._article = value;
  }

  private finish(article: Article) {
    this.article = new Article(article);
  }

  update(id: string, article: DraftFeed) {
    this.request.update(id, article).then(this.finish);
  }

  publish(article: DraftFeed) {
    this.request.publish(article).then(this.finish);
  }
}