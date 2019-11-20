import ArticleRequest from '../requests/articleRequest';
import ArticleListServiceType from './enums/ArticleListServiceType';
import ArticleList from '../models/articleListModel';
import {computed, observable, action} from 'mobx';
import Article from '../models/articleModel';
import Service from '../libs/Service';

export default class ArticleListService extends Service {
  readonly request: ArticleRequest;
  @observable private _query: string;
  @observable articleList: ArticleList;
  @observable private _selectedPage: number;

  constructor(private readonly type: ArticleListServiceType) {
    super();
    this.request = ArticleRequest.instance;
  }

  @action
  async update() {
    switch (this.type) {
      case ArticleListServiceType.Author:
        await this.loadInternal({author: this._query, limit: 5, offset: this.offset(5)});
        break;
      case ArticleListServiceType.Tag:
        await this.loadInternal({tag: this._query, limit: 10, offset: this.offset(10)});
        break;
      case ArticleListServiceType.Like:
        await this.loadInternal({favorited: this._query, limit: 5, offset: this.offset(5)});
        break;
      case ArticleListServiceType.FEED:
        await this.loadInternal({limit: 10, offset: this._selectedPage * 10});
        break;
    }
  }

  @action load() {
    this
      .update()
      .then()
      .catch()
  }

  offset(limit) {
    if (this.selectedPage && !isNaN(this.selectedPage)) {
      return this.selectedPage * limit;
    } else {
      return 0;
    }
  }

  @computed get list(): Array<Article> {
    return this.articleList ? this.articleList.list : [];
  }

  @computed get pages(): ReadonlyArray<number> {
    return this.articleList ? this.articleList.pages : [];
  }

  @computed get selectedPage(): number {
    return this._selectedPage;
  }

  set selectedPage(value: number) {
    this._selectedPage = value;
  }

  @computed get query(): string {
    return this._query;
  }

  set query(value: string) {
    this._query = value;
    this
      .update()
      .then()
      .catch();
  }

  private async loadInternal(param) {
    const result = await this.request.loadArticlesExternal(param);
    this.articleList = new ArticleList(result.articles, result.articlesCount)
  }

  @action
  updateLike(i: number) {
    const article = this.articleList.list[i];
    const finish = raw => this.articleList[i] = new Article(raw);
    this.request[article.isFavorite ? 'set' : 'remove'](article.id).then(finish);
  }
}