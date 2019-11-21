import {computed, observable} from "mobx";
import ArticleListService from '../../services/articleListService';
import ArticleListServiceType from '../../services/enums/ArticleListServiceType';
import VM from '../../libs/VM';
import TagService from '../../services/tagService';


export default class MainVM extends VM<ArticleListService> {
  static instance: MainVM;
  @observable private _topPage: number;
  @observable private _clickedTag: string;
  @observable private _popularTagList: ReadonlyArray<string> = [];

  constructor() {
    super(
      new ArticleListService(ArticleListServiceType.FEED),
      new ArticleListService(ArticleListServiceType.Tag)
    );
    this.serviceSeparator = !!this.topPage;
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
    return this._topPage || 0;
  }

  get clickedTag(): string {
    return this._clickedTag || '';
  }

  set clickedTag(value: string) {
    this._clickedTag = value;
    this.topPage = 1;
    this.service.query = value;
  }

  set topPage(value: number) {
    this._topPage = value;
    this.page = 0;
  }

  set page(value: number) {
    this.service.selectedPage = value;
  }

  @computed get popularTagList(): ReadonlyArray<string> {
    return TagService.tags || [];
  }

  updateLike(i: number) {
    this.service.updateLike(i);
  }

  @computed get topPageList() {
    return ['Global Feed', this.clickedTag ? '# ' + this.clickedTag : ''];
  }
}

MainVM.instance = new MainVM();