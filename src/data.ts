
export interface IArticle {
    id: number;
    name: string;
    published: boolean;
}

export interface IComment {
    id: number;
    text: string;
    article_id: number;
}

export const articles: IArticle[] = [
    { id: 1, name: 'My first article', published: true },
    { id: 2, name: 'My second article', published: false },
    { id: 3, name: 'My thrid article', published: false },
];

export const comments: IComment[] = [
    { id: 1, text: 'This article is WOW!', article_id: 1 },
    { id: 2, text: 'I have read better', article_id: 2 },
    { id: 3, text: 'Post more articles like that, please', article_id: 3 },
];
