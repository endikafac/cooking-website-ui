
export class VwComment {
    id: number;
    recipeId: number;
    comment: string;
    lastDate: number;
    authorId: number;
    author: string;
    authorUsername: string;

    constructor(  comment: string, recipeId: number, lastDate: number, author: string, authorId: number,authorUsername: string) {
        this.recipeId = recipeId;
        this.comment = comment;
        this.lastDate = lastDate;
        this.author = author;
        this.authorId = authorId;
        this.authorUsername = authorUsername;
    }
}
