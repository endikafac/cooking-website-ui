import { User } from "./user";
import { Keyword } from "./keyword";

export class Recipe {
    id: number;
    user: User;
    name: string;
    description: string;
    keywords: Keyword[];
    auCreationUser: number;
    auCreationDate: number;
    auModificationUser: number;
    auModificationDate: number;
    auActive: boolean;
    constructor(user: User, name: string, description: string, keywords: Keyword[]) {
        this.user = user;
        this.name = name;
        this.description = description;
        this.keywords = keywords;
    }
}
