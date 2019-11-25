import {observable} from 'mobx';
import Article from './articleModel';
import {LoadArticlesResult} from '../requests/articleRequest';


export default class ArticleBundle {
    @observable list: Array<Article> = [];
    @observable pages: ReadonlyArray<number> = [];

    constructor(rawBundle: LoadArticlesResult, split?: number) {
        if (rawBundle) {
            const page = Math.ceil(rawBundle.articlesCount / split);
            this.pages = new Array(page).fill(0).map((_, i) => i);
            this.list = rawBundle.articles.map(article => new Article(article));
        }
    }
}