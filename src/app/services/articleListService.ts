import ArticleRequest from '../requests/articleRequest';
import ArticleListServiceType from './enums/ArticleListServiceType';
import ArticleList from '../models/articleListModel';
import {computed, observable} from 'mobx';
import Article from '../models/articleModel';
import Service from '../libs/Service';

export default class ArticleListService extends Service {
    readonly request: ArticleRequest;
    @observable private _query: string = '';
    @observable articleList: ArticleList;
    @observable private _selectedPage: number = 0;
    @observable private readonly limit: number = 0;

    constructor(private readonly type: ArticleListServiceType) {
        super();
        this.articleList = new ArticleList();
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
        const limitOffset = {limit, offset};
        switch (this.type) {
            case ArticleListServiceType.Author:
                await this.load({author: this.query, ...limitOffset});
                break;
            case ArticleListServiceType.Tag:
                await this.load({tag: this.query, ...limitOffset});
                break;
            case ArticleListServiceType.Like:
                await this.load({favorited: this.query, ...limitOffset});
                await this.load({favorited: this.query, ...limitOffset});
                break;
            case ArticleListServiceType.FEED:
                await this.load(limitOffset);
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
        return this.articleList.list;
    }

    @computed get pages(): ReadonlyArray<number> {
        return this.articleList.pages;
    }

    @computed get selectedPage(): number {
        return this._selectedPage;
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

    private async load(param) {
        const result = await this.request.loadArticles(param);
        this.articleList = new ArticleList(result.articles, result.articlesCount, this.limit);
    }

    updateLike(i: number) {
        const finish = raw => this.list[i] = new Article(raw);
        const method = (this.list[i].isFavorite ? 'remove' : 'set') + 'Like';
        this.request[method](this.list[i].id).then(finish);
    }
}