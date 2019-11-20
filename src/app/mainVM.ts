import {computed} from "mobx";
import ArticleListService from './articleListService';
import VM from './VM';


export default class MainVM extends VM<ArticleListService> {
  static instance = new MainVM();

  constructor() {
    super(null, null);
  }

  init() {
    console.log(this.service);
  }

  @computed get service() {
    return this.getService;
  }
}
