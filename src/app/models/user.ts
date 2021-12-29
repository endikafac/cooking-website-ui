import { Role } from "./role";

export class User {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    lastConnection: string;
    roles: Role[];

    constructor(username: string, email: string, password: string, firstname: string, lastname: string, roles: Role[]) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.firstname = "";
        this.lastname = '';
        this.roles = roles;
    }
}
