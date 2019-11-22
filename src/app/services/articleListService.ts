import ArticleRequest from '../requests/articleRequest';
import ArticleListServiceType from './enums/ArticleListServiceType';
import ArticleList from '../models/articleListModel';
import {computed, observable, action} from 'mobx';
import Article from '../models/articleModel';
import Service from '../libs/Service';

export default class ArticleListService extends Service {
  readonly request: ArticleRequest;
  @observable private _query: string;
  @observable private _articleList: ArticleList;
  @observable private _selectedPage: number;
  @observable private readonly limit: number;

  constructor(private readonly type: ArticleListServiceType) {
    super();
    this.request = ArticleRequest.instance;
    switch (this.type) {
      case ArticleListServiceType.Author:
      case ArticleListServiceType.Like:
        this.limit = 5;
        break;
      case ArticleListServiceType.Tag:
      case ArticleListServiceType.FEED:
        this.limit = 10;
        break;
    }
  }
  async update() {
    const {limit, offset} = this;
    switch (this.type) {
      case ArticleListServiceType.Author:
        await this.loadInternal({author: this.query, limit, offset});
        break;
      case ArticleListServiceType.Tag:
        await this.loadInternal({tag: this.query, limit, offset});
        break;
      case ArticleListServiceType.Like:
        await this.loadInternal({favorited: this.query, limit, offset});
        await this.loadInternal({favorited: this.query, limit, offset});
        break;
      case ArticleListServiceType.FEED:
        await this.loadInternal({limit, offset});
        break;
    }
  }

  @computed get offset() {
    if (this.selectedPage && !isNaN(this.selectedPage)) {
      return this.selectedPage * this.limit;
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
    return this._selectedPage || 0;
  }

  @computed get query(): string {
    return this._query;
  }

  set selectedPage(value: number) {
    this._selectedPage = value;
    this.update();
  }

  set query(value: string) {
    this._query = value;
    this._selectedPage = 0;
    this.update();
  }

  @computed get articleList(): ArticleList {
    return this._articleList;
  }

  set articleList(value: ArticleList) {
    this._articleList = value;
  }

  private async loadInternal(param) {
    const result = await this.request.loadArticlesExternal(param);
    this.articleList = new ArticleList(result.articles, result.articlesCount);
  }

  updateLike(i: number) {
    const finish = raw => this.list[i] = new Article(raw);
    const method = (this.list[i].isFavorite ? 'remove' : 'set') + 'Like';
    this.request[method](this.list[i].id).then(finish);
  }
}