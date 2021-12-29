
export class Keyword {
    id: number;
    keyword: string;
    auCreationUser: number;
    auCreationDate: number;
    constructor(keyword: string, auCreationUser :number, auCreationDate: number) {
        this.keyword = keyword;
        this.auCreationUser = auCreationUser;
        this.auCreationDate = auCreationDate;
    }

    toString() : string{
        var result = this.keyword;
        return result;
    }

}
