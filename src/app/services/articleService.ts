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

  load(id: string) {
    this.request.loadArticle(id)
      .then(article => this.article = article);
  }

  @computed get article(): Article {
    return this._article || Article.getEmptyObject();
  }

  set article(value: Article) {
    this._article = value;
  }

  private finish(article: Article) {
    this.article = new Article(article);
  }

  async update(id: string, article: DraftFeed) {
    this.article = new Article(await this.request.update(id, article))
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