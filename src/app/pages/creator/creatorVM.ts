import {computed, observable} from "mobx";
import VM from '../../libs/VM';
import ArticleService from '../../services/articleService';
import Article from '../../models/articleModel';

export default class CreatorVM extends VM<ArticleService> {
    static instance: CreatorVM;
    @observable redirectID: string;

    @observable currentTagValue: string = '';

    constructor() {
        super(new ArticleService());
        this.redirectID = '';
    }

    publish() {
        this.service
            .publish()
            .then(article => this.redirectID = article.slug);
    }

    init() {
        this.setService(new ArticleService());
        this.redirectID = '';
    }

    @computed get article(): Article {
        return this.service.article;
    }

    addTag() {
        this.article.addTag(this.currentTagValue);
        this.currentTagValue = '';
    }

    removeTag(index: number) {
        this.article.removeTag(index);
    }

}

CreatorVM.instance = new CreatorVM();