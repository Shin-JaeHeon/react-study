import Article from "../models/articleModel";
import HttpClient from "../libs/httpClient";
import {DraftFeed} from "../interface";
import {AxiosResponse} from "axios";

interface LoadArticlesResult {
  articles: Array<Object>;
  articlesCount: number;
}

export default class ArticleRequest extends HttpClient {
  static instance = new ArticleRequest();

  constructor() {
    super('articles');
  }

  async loadArticle(id: string): Promise<Article> {
    return new Article((await this.axios.get('/' + id)).data.article);
  }

  async deleteArticle(id: string): Promise<void> {
    await this.axiosAuthorized.delete('/' + id);
  }

  async loadArticlesExternal(params: Object): Promise<LoadArticlesResult> {
    return (await this.axios.get('', {params})).data;
  }

  async update(id: string, article: DraftFeed): Promise<Article> {
    return (await this.axiosAuthorized.put('/' + id, {article})).data.article;
  }

  async publish(article: DraftFeed): Promise<Article> {
    return (await this.axiosAuthorized.post('', {article})).data.article;
  }

  async setLike(id: string): Promise<Article> {
    return (await this.axiosAuthorized.post(`/${id}/favorite`)).data.article;
  }

  async removeLike(id: string): Promise<Article> {
    return (await this.axiosAuthorized.delete(`/${id}/favorite`)).data.article;
  }
}
