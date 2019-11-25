import {observable} from 'mobx';
import Article, {ArticleVO} from './articleModel';

const ARTICLE_PER_PAGE = 5;

export default class ArticleList {
	@observable list: Array<Article> = [];
	@observable pages: ReadonlyArray<number> = [];

	constructor(articles: ReadonlyArray<ArticleVO>, count: number) {
		const page = Math.ceil(count / ARTICLE_PER_PAGE);

		this.pages = new Array(page).fill(0).map((_, i) => i);
		this.list = articles.map(article => new Article(article));
	}
}