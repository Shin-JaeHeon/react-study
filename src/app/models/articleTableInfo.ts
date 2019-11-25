import {computed, observable} from "mobx";
import ArticleListServiceType from '../services/enums/ArticleListServiceType';
import {LoadArticlesRQ} from '../requests/rq/loadArticlesRQ';

export class ArticleTableInfo {
    @observable query: string = '';
    @observable selectedPage: number = 0;
    readonly limit: number = 0;

    constructor(readonly type: ArticleListServiceType) {
        switch (this.type) {
            case ArticleListServiceType.AUTHOR:
            case ArticleListServiceType.LIKE:
                this.limit = 5;
                break;
            case ArticleListServiceType.TAG:
            case ArticleListServiceType.FEED:
                this.limit = 10;
        }
    }

    @computed get offset() {
        if (this.selectedPage && !isNaN(this.selectedPage)) {
            return this.selectedPage * this.limit;
        }
        return 0;
    }

    get rqParam(): LoadArticlesRQ {
        const {limit, offset} = this;
        switch (this.type) {
            case ArticleListServiceType.AUTHOR:
                return {author: this.query, limit, offset};
            case ArticleListServiceType.TAG:
                return{tag: this.query, limit, offset};
            case ArticleListServiceType.LIKE:
                return {favorited: this.query, limit, offset};
            case ArticleListServiceType.FEED:
                return {limit, offset};
        }
    }
}