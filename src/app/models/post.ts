import { User } from './user';

export class Post {
    id: number;
    title: string;
    body: string;
    bannerUrl: string;
    author: User;
    likes: number;
    liked: boolean;
    game: string;
    gameId: number;
    isPrivate: boolean;
}

export class CreatedPost {
    body: string;
    title: string;
    isPrivate: boolean;
    gameId: number;
}
