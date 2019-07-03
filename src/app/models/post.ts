export class Post {
    id: number;
    title: string;
    body: string;
    bannerUrl: string;
    author: string;
    votes: number;
}

export class CreatedPost {
    body: string;
    title: string;
    isPrivate: boolean;
    game: string;
}
