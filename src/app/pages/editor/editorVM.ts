import {observable, computed} from "mobx";
import Article from "app/models/articleModel";
import VM from '../../libs/VM';
import ArticleService from '../../services/articleService';

export default class EditorVM extends VM<ArticleService> {
    static instance: EditorVM;
    @observable redirectID = '';

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
        this.service.update()
            .then(() => this.redirectID = this.article.id)
            .catch(() => alert(`Update Failed!!`));
    }

    addTag(tag: string) {
        this.article.addTag(tag);
    }

    removeTag(index: number) {
        this.article.removeTag(index);
    }

    clearRedirectID() {
        this.redirectID = '';
    }

}
EditorVM.instance = new EditorVM();
