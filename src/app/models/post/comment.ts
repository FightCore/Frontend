import { User } from '../user';

export class Comment {
    id: number;
    content: string;
    parentId: number;
    parent: Comment;
    author: User;
    authorId: number;
    postedAt: Date;
}
