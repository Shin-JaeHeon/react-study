import {computed, observable} from "mobx";
import Article from "app/models/articleModel";
import {Profile} from "../../interface";
import ArticleListService from '../../services/articleListService';
import ArticleService from '../../services/articleService';
import ArticleListServiceType from '../../services/enums/ArticleListServiceType';
import AccountRequest from '../../requests/accountRequest';
import VM from '../../libs/VM';

export default class AccountVM extends VM {
  static instance = new AccountVM();
  @observable private _username: string;
  @observable private _userData: Profile;
  @observable private _topPage: number;
  @observable private _pageList: ReadonlyArray<number>;
  private service3: ArticleService;

  constructor() {
    super(new ArticleListService(ArticleListServiceType.Author),
      new ArticleListService(ArticleListServiceType.Like));
    this._userData = {
      username: '',
      image: ''
    };
    this.serviceSeparator = !!this.topPage;
    this.service3 = new ArticleService();
  }

  load() {
    AccountRequest.instance.getUserInfo(this.username).then(userData => this.userData = userData);
    this.getAllService().map((service: ArticleListService) => service.query = this.username);
  }

  @computed get articleList(): Array<Article> {
    return this.service.list || [];
  }

  @computed get pageList() {
    return this.service.pages || [];
  }

  @computed get userData(): Profile {
    return this._userData || {
      username: '',
      image: ''
    };
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  set userData(value: Profile) {
    this._userData = value;
  }

  @computed get service(): ArticleListService {
    return super.getService() as ArticleListService;
  }

  @computed get selectedPage(): number {
    return this.service.selectedPage || 0;
  }

  set selectedPage(value: number) {
    this.service.selectedPage = value;
    this.load();
  }

  get topPage(): number {
    return this._topPage || 0;
  }

  set topPage(value: number) {
    this._topPage = value;
    this.selectedPage = 0;
  }

  updateLike(i: number) {
    this.service.updateLike(i);
  }

  get topPageList() {
    return ['My Articles', 'Favorited Articles'];
  }

}