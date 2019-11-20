import {computed, observable} from "mobx";
import ArticleRequest from "../../requests/articleRequest";
import Article from "../../models/articleModel";

export default class ArticleVM {

  static instance = new ArticleVM();
  @observable id: string = '';
  @observable private _article: Article;

  load(id: string) {
    this.id = id;
    ArticleRequest
      .instance
      .loadArticle(id)
      .then(article => this.article = article);
  }

  delete() {
    ArticleRequest
      .instance
      .deleteArticle(this.id)
      .then(() => this.article = null)
      .catch(() => alert('Delete Failed!'));
  }

  @computed get article(): Article {
    return this._article || Article.getEmptyObject();
  }

  set article(value: Article) {
    this._article = value;
  }

  @computed get isDeleted() {
    return this._article === null;
  }
}