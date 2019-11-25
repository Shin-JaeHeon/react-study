import ArticleRequest from '../requests/articleRequest';
import ArticleListServiceType from './enums/ArticleListServiceType';
import ArticleBundle from '../models/articleBundle';
import {computed, observable} from 'mobx';
import Article from '../models/articleModel';
import Service from '../libs/Service';
import {ArticleTableInfo} from '../models/articleTableInfo';

const request = ArticleRequest.instance;

export default class ArticleListService extends Service {
    @observable articleList: ArticleBundle;

    private readonly info: ArticleTableInfo;

    constructor(type: ArticleListServiceType) {
        super();
        this.info = new ArticleTableInfo(type);
        this.articleList = new ArticleBundle();
    }

    @computed get list(): Array<Article> {
        return this.articleList.list;
    }

    @computed get pages(): ReadonlyArray<number> {
        return this.articleList.pages;
    }

    @computed get selectedPage(): number {
        return this.info.selectedPage;
    }

    selectPage(value: number) {
        this.info.selectedPage = value;
        this.load();
    }

    set query(value: string) {
        this.info.query = value;
        this.info.selectedPage = 0;
        this.load();
    }

    async load() {
        const param = this.info.rqParam;
        const result = await request.loadArticles(param);
        this.articleList = new ArticleBundle(result.articles, result.articlesCount, this.info.limit);
    }

    updateLike(i: number) {
        const finish = raw => this.list[i] = new Article(raw);
        const method = (this.list[i].isFavorite ? 'remove' : 'set') + 'LIKE';
        request[method](this.list[i].id).then(finish);
    }
}