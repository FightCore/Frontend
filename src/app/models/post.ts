import { User } from './user';
import { Character } from './character';
import { Game } from './game';
import { PostCategory } from './post/post-category';

export class Post {
    id: number;
    title: string;
    body: string;
    author: User;
    likes: number;
    liked: boolean;
    game: Game;
    gameId: number;
    isPrivate: boolean;
    character?: Character;
    characterId?: number;
    category: PostCategory;
    tags: string[];
    description: string;
}

export class CreatedPost {
    body: string;
    title: string;
    isPrivate: boolean;
    gameId: number;
    characterId?: number;
}
