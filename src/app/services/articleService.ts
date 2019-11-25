import {computed, observable} from "mobx";
import ArticleRequest from '../requests/articleRequest';
import Article from '../models/articleModel';
import Service from '../libs/Service';

export default class ArticleService extends Service {
  request: ArticleRequest;
  @observable private _article: Article;


  constructor() {
    super();
    this.request = ArticleRequest.instance;
    this._article = new Article();
  }

  load(id: string) {
    this.request.loadArticle(id)
      .then(article => this.article = new Article(article));
  }

  @computed get article(): Article {
    return this._article;
  }

  set article(value: Article) {
    this._article = value;
  }

  async update() {
    const {title, description, body, tagList} = this.article;
    return await this.request.update(this.article.id, {title, description, body, tagList});
  }

  async publish() {
    const {title, description, body, tagList} = this.article;
    return this.request.publish({title, description, body, tagList});
  }

  delete() {
    ArticleRequest
      .instance
      .deleteArticle(this.article.id)
      .then(() => this.article = null)
      .catch(() => alert('Delete Failed!'));
  }
}