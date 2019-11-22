import {computed, observable} from "mobx";
import Article from "app/models/articleModel";
import {Profile} from "../../interface";
import ArticleListService from '../../services/articleListService';
import ArticleListServiceType from '../../services/enums/ArticleListServiceType';
import AccountRequest from '../../requests/accountRequest';
import VM from '../../libs/VM';

export default class AccountVM extends VM<ArticleListService> {
  static instance = new AccountVM();
  @observable private _username: string;
  @observable private _userData: Profile;
  @observable private _pageList: ReadonlyArray<number>;

  constructor() {
    super(new ArticleListService(ArticleListServiceType.Author),
      new ArticleListService(ArticleListServiceType.Like));
    this._userData = {
      username: '',
      image: ''
    };
  }

  init() {
    AccountRequest.instance
      .getUserInfo(this.username)
      .then(userData => this.userData = userData);
    this.allService.forEach(service => service.query = this.username);
  }

  @computed get articleList(): Array<Article> {
    return this.service.list;
  }

  @computed get pageList() {
    return this.service.pages;
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
    this.init();
  }

  set userData(value: Profile) {
    this._userData = value;
  }

  @computed get selectedPage(): number {
    return this.service.selectedPage || 0;
  }

  set selectedPage(value: number) {
    this.service.selectedPage = value;
  }

  get topPage(): number {
    return this.serviceSeparator || 0;
  }

  set topPage(value: number) {
    this.serviceSeparator = value;
  }

  updateLike(i: number) {
    this.service.updateLike(i);
  }

  get topPageList() {
    return ['My Articles', 'Favorited Articles'];
  }

}
AccountVM.instance = new AccountVM();