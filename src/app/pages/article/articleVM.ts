import {computed} from "mobx";
import Article from "../../models/articleModel";
import VM from '../../libs/VM';
import ArticleService from '../../services/articleService';

export default class ArticleVM extends VM<ArticleService> {
  static instance: ArticleVM;

  constructor() {
    super(new ArticleService());
  }

  load(id: string) {
    this.service.load(id);
  }

  delete() {
    this.service.delete();
  }

  @computed get article(): Article {
    return this.service.article;
  }

  @computed get isDeleted(): boolean {
    return this.article === null;
  }
}

ArticleVM.instance = new ArticleVM();
