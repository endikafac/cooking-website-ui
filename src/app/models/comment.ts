import { Recipe } from "./recipe";
import { User } from "./user";

export class Comment {
    id: number;
    comment: string;
    auCreationUser: number;
    auCreationDate: number;
    auModificationUser: number;
    auModificationDate: number;
    auActive: boolean;

    constructor(  comment: string, auCreationUser: number, auCreationDate: number) {
        this.comment = comment;
        this.auCreationUser = auCreationUser;
        this.auCreationDate = auCreationDate;
    }
}
