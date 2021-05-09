import { User } from './user';
import { Character } from './character';
import { Game } from './game';
import { PostCategory } from './post/post-category';
import { Comment } from './post/comment';

export class Post {
  id: number;
  title: string;
  html: string;
  markdown: string;
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
  comments: Comment[];
}

export class CreatedPost {
  html: string;
  markdown: string;
  title: string;
  isPrivate: boolean;
  gameId: number;
  characterId?: number;
}
