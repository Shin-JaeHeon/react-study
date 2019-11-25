import {computed, observable} from "mobx";
import ArticleListService from '../../services/articleListService';
import ArticleListServiceType from '../../services/enums/ArticleListServiceType';
import VM from '../../libs/VM';
import TagService from '../../services/tagService';


export default class MainVM extends VM<ArticleListService> {
    static instance: MainVM;
    @observable tagClicked: string = '';

    constructor() {
        super(
            new ArticleListService(ArticleListServiceType.FEED),
            new ArticleListService(ArticleListServiceType.Tag)
        );
    }

    @computed get popularTagList() {
        return TagService.tags;
    }

    init() {
        this.service.update();
    }

    @computed get articleList() {
        return this.service.list;
    }

    @computed get pageList() {
        return this.service.pages;
    }

    @computed get page(): number {
        return this.service.selectedPage;
    }

    @computed get topPage(): number {
        return this.serviceSeparator;
    }

    @computed get clickedTag(): string {
        return this.tagClicked;
    }

    set clickedTag(value: string) {
        this.tagClicked = value;
        this.topPage = 1;
        this.service.query = value;
    }

    set topPage(value: number) {
        this.serviceSeparator = value;
    }

    set page(value: number) {
        this.service.selectedPage = value;
    }

    updateLike(i: number) {
        this.service.updateLike(i);
    }

    @computed get topPageList() {
        return ['Global Feed', this.clickedTag ? '# ' + this.clickedTag : ''];
    }
}

MainVM.instance = new MainVM();