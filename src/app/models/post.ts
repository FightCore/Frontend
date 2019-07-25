export class Post {
    id: number;
    title: string;
    body: string;
    bannerUrl: string;
    author: string;
    votes: number;
    game: string;
}

export class CreatedPost {
    body: string;
    title: string;
    isPrivate: boolean;
    gameId: number;
}
