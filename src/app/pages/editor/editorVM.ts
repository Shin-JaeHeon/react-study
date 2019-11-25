import {observable, computed} from "mobx";
import Article from "app/models/articleModel";
import VM from '../../libs/VM';
import ArticleService from '../../services/articleService';

export default class EditorVM extends VM<ArticleService> {
    static instance: EditorVM;
    @observable private _redirectID = '';
    @observable private _article: Article = null;

    constructor() {
        super(new ArticleService(), null);

    }

    @computed get article(): Article {
        return this.service.article;
    }

    load(id: string) {
        this.service.load(id);
    }

    update() {
        this.service
            .update()
            .then(() => this.redirectID = this.article.id)
            .catch(() => alert(`Update Failed!!`));
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

    @computed get tagList(): Array<string> {
        return this.article.tagList;
    }

    addTag(tag: string) {
        this.article.addTag(tag);
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

    clearRedirectID() {
        this.redirectID = '';
    }

}
EditorVM.instance = new EditorVM();
