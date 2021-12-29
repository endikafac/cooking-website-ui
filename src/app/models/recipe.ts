import { User } from "./user";
import { Keyword } from "./keyword";
import { Comment } from "./comment";

export class Recipe {
    id: number;
    user: User;
    name: string;
    description: string;
    keywords: Keyword[];
    comments: Comment[];
    auCreationUser: number;
    auCreationDate: number;
    auModificationUser: number;
    auModificationDate: number;
    auActive: boolean;
    constructor(user: User, name: string, description: string, keywords: Keyword[], comments: Comment[]) {
        this.user = user;
        this.name = name;
        this.description = description;
        this.keywords = keywords;
        this.comments = comments;
    }
}
