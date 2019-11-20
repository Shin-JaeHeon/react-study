import Article from './articleModel';

export default class ArticleList {
  private _list: Array<Article>;
  private _pages: ReadonlyArray<number>;

  constructor(articles: Array<Object>, count) {
    this._list = articles.map(article => new Article(article));
    this._pages = [...new Array(Math.floor(count / 5) + ((count % 5) ? 1 : 0))].map((_, i) => i);
  }

  get pages(): ReadonlyArray<number> {
    return this._pages || [];
  }

  set pages(value: ReadonlyArray<number>) {
    this._pages = value;
  }
  get list(): Array<Article> {
    return this._list || [];
  }

  set list(value: Array<Article>) {
    this._list = value;
  }
}