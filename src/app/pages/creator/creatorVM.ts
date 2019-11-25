import {observable, computed} from "mobx";
import VM from '../../libs/VM';
import ArticleService from '../../services/articleService';
import Article from '../../models/articleModel';

export default class CreatorVM extends VM<ArticleService> {
    static instance: CreatorVM;
    @observable private _redirectID: string;

    constructor() {
        super(new ArticleService());
        this.redirectID = '';
    }

    publish() {
        this.service
            .publish()
            .then(article => this.redirectID = article.slug);
    }

    @computed get article(): Article {
        return this.service.article;
    }

    @computed get title(): string {
        return this.article.title;
    }

    set title(value: string) {
        this.article.title = value;
    }

    @computed get description(): string {
        return this.article.description;
    }

    set description(value: string) {
        this.article.description = value;
    }

    @computed get body(): string {
        return this.article.body;
    }

    set body(value: string) {
        this.article.body = value;
    }

    @computed get tagList() {
        return this.article.tagList;
    }

    addTag(value: string) {
        this.article.addTag(value);
    }

    removeTag(index: number) {
        this.article.removeTag(index);
    }

    @computed get redirectID() {
        return this._redirectID;
    }

    set redirectID(value: string) {
        this._redirectID = value;
    }

    init() {
        this.setService(new ArticleService());
        this.redirectID = '';
    }
}

CreatorVM.instance = new CreatorVM();