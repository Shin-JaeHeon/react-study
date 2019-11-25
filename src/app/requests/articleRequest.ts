import {ArticleVO} from "../models/articleModel";
import HttpClient from "../libs/httpClient";
import {LoadArticlesRQ} from './rq/loadArticlesRQ';

export interface LoadArticlesResult {
    articles: Array<ArticleVO>;
    articlesCount: number;
}

export default class ArticleRequest extends HttpClient {
    static instance = new ArticleRequest();

    constructor() {
        super('articles');
    }

    async loadArticle(id: string): Promise<ArticleVO> {
        return (await this.axios.get('/' + id)).data.article;
    }

    async deleteArticle(id: string): Promise<void> {
        await this.axios.delete('/' + id);
    }

    async loadArticles(params: Readonly<LoadArticlesRQ>): Promise<LoadArticlesResult> {
        return (await this.axios.get('', {params})).data;
    }

    async update(id: string, article): Promise<ArticleVO> {
        return (await this.axios.put('/' + id, {article})).data.article;
    }

    async publish(article): Promise<ArticleVO> {
        return (await this.axios.post('', {article})).data.article;
    }

    async setLike(id: string): Promise<ArticleVO> {
        return (await this.axios.post(`/${id}/favorite`)).data.article;
    }

    async removeLike(id: string): Promise<ArticleVO> {
        return (await this.axios.delete(`/${id}/favorite`)).data.article;
    }
}
