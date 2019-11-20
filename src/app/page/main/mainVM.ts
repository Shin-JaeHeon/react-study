import {computed, observable} from "mobx";
import TagRequest from "../../requests/tagRequest";
import ArticleListService from '../../services/articleListService';
import ArticleListServiceType from '../../services/enums/ArticleListServiceType';
import VM from '../../libs/VM';


export default class MainVM extends VM {
  static instance = new MainVM();
  @observable private _topPage: number;
  @observable private _clickedTag: string;
  @observable private _popularTagList: ReadonlyArray<string> = [];

  constructor() {
    super(
      new ArticleListService(ArticleListServiceType.FEED),
      new ArticleListService(ArticleListServiceType.Tag)
    );
    this.serviceSeparator = !!this.topPage;
    TagRequest
      .instance
      .getPopularTags()
      .then(list => this.popularTagList = list);
    this.serviceSeparator = !!this.topPage;
  }

  init() {
    this.service
      .update()
      .then()
      .catch();
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
    return this._popularTagList || [];
  }

  set popularTagList(value: ReadonlyArray<string>) {
    this._popularTagList = value;
  }

  @computed get service(): ArticleListService {
    return super.getService() as ArticleListService;
  }

  updateLike(i: number) {
    this.service.updateLike(i);
  }

  @computed get topPageList() {
    return ['Global Feed', this.clickedTag ? '# ' + this.clickedTag : ''];
  }
}
