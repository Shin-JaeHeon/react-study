import {computed} from "mobx";

export default class User {
  private _id: number;
  private _email: string;
  private _username: string;
  private _token: string;
  private _image: string;
  private _bio: string;

  constructor(rawData) {
    this._id = rawData.id;
    this._email = rawData.email;
    this._username = rawData.username;
    this._token = rawData.token;
    this._image = rawData.image;
    this._bio = rawData.bio;
  }
  @computed get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  @computed get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  @computed get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  @computed get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }

  @computed get image(): string {
    return this._image;
  }

  set image(value: string) {
    this._image = value;
  }

  @computed get bio(): string {
    return this._bio;
  }

  set bio(value: string) {
    this._bio = value;
  }
}