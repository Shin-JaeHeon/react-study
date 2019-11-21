export default class Article {
  private _username: string;
  private _userImage: string;
  private _id: string;
  private _date: string;
  private _title: string;
  private _description: string;
  private _article: string;
  private _isFavorite: boolean;
  private _favoritesCount: number;
  private _tags: Array<string>;

  static getEmptyObject(): Article {
    return new Article({
      author: {
        username: '',
        userImage: '',
      },
      id: '',
      date: '',
      title: '',
      description: '',
      article: '',
      isFavorite: false,
      favoritesCount: 0,
      tagList: []
    });
  }

  constructor(rawData) {
    this._username = rawData.author.username;
    this._userImage = rawData.author.image;
    this._id = rawData.slug;
    this._date = rawData.createdAt;
    this._title = rawData.title;
    this._description = rawData.description;
    this._article = rawData.body;
    this._isFavorite = rawData.favorited;
    this._favoritesCount = rawData.favoritesCount;
    this._tags = rawData.tagList;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get userImage(): string {
    return this._userImage;
  }

  set userImage(value: string) {
    this._userImage = value;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get date(): string {
    return this._date;
  }

  set date(value: string) {
    this._date = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get article(): string {
    return this._article;
  }

  set article(value: string) {
    this._article = value;
  }

  get isFavorite(): boolean {
    return this._isFavorite;
  }

  set isFavorite(value: boolean) {
    this._isFavorite = value;
  }

  get favoritesCount(): number {
    return this._favoritesCount;
  }

  set favoritesCount(value: number) {
    this._favoritesCount = value;
  }

  get tags(): Array<string> {
    return this._tags;
  }

  set tags(value: Array<string>) {
    this._tags = value;
  }
}