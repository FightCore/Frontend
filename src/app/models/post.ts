export class Post {
    id: number;
    title: string;
    body: string;
    bannerUrl: string;
    author: string;
    likes: number;
    liked: boolean;
    game: string;
}

export class CreatedPost {
    body: string;
    title: string;
    isPrivate: boolean;
    gameId: number;
}
