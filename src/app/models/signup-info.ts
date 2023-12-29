export class SignUpInfo {
    firstname: string;
    
    lastname:string;
    username: string;
    email: string;
    password: string;
    roles: string[];
    constructor(firstname: string,lastname:string, username: string, email: string, password: string) {
        this.firstname = firstname;
        this.lastname=lastname;
        this.username = username;
        this.email = email;
        this.password = password;
        this.roles= ['user'];
    }
}