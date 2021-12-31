
export class VwUser {
    id: number;
    username: string;
    recipesNumber: number;

    constructor(  username: string, id: number, recipesNumber: number) {
        this.username = username;
        this.id = id;
        this.recipesNumber = recipesNumber;
    }
}
