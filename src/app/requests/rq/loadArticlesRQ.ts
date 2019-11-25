interface BaseRQ {
    limit: number;
    offset: number;
}

export interface LoadArticlesAuthorRQ extends BaseRQ {
    author: string;
}

export interface LoadArticlesTagRQ extends BaseRQ {
    tag: string;
}

export interface LoadArticlesFavoritedRQ extends BaseRQ {
    favorited: string;
}

export interface LoadArticlesFeedRQ extends BaseRQ {
}

export type LoadArticlesRQ = (
    LoadArticlesAuthorRQ |
    LoadArticlesTagRQ |
    LoadArticlesFavoritedRQ |
    LoadArticlesFeedRQ
);