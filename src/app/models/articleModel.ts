import {observable, computed} from "mobx";
import {popItem} from '../libs/lib';

export interface ArticleAuthorVO {
    username: string;
    image: string;
}

export interface ArticleVO {
    author: ArticleAuthorVO,
    slug: string;
    createdAt: string;
    title: string;
    description: string;
    body: string;
    favorited: boolean;
    favoritesCount: number;
    tagList: Array<string>;
}

export default class Article {
    username: string = '';
    userImage: string = '';
    id: string = '';
    date: string = '';
    title: string = '';
    description: string = '';
    body: string = '';
    isFavorite: boolean = false;
    favoritesCount: number = 0;
    @observable private tags: Array<string> = [];

    constructor(rawData?: ArticleVO) {
        if (rawData) {
            this.username = rawData.author.username;
            this.userImage = rawData.author.image;
            this.id = rawData.slug;
            this.date = rawData.createdAt;
            this.title = rawData.title;
            this.description = rawData.description;
            this.body = rawData.body;
            this.isFavorite = rawData.favorited;
            this.favoritesCount = rawData.favoritesCount;
            this.tags = rawData.tagList;
        }
    }

    addTag(value: string) {
        const tag = value.trim();
        if (!this.tags.includes(tag) && tag) this.tags.push(tag);
    }

    @computed get tagList(): Array<string> {
        return this.tags || [];
    }

    removeTag(index: number) {
        this.tags = popItem(this.tags, index);
    }
}