import {observable} from 'mobx';
import Article, {ArticleVO} from './articleModel';


export default class ArticleBundle {
    @observable list: Array<Article> = [];
    @observable pages: ReadonlyArray<number> = [];

    constructor(articles?: ReadonlyArray<ArticleVO>, count?: number, split?: number) {
        if(articles) {
            const page = Math.ceil(count / split);
            this.pages = new Array(page).fill(0).map((_, i) => i);
            this.list = articles.map(article => new Article(article));
        }
    }
}