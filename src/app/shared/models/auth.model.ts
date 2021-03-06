export class SignUpData {
    // name: string;
    email: string;
    password: string;

    // constructor(name: string, email: string, password: string) {
    //     this.name = name;
    //     this.email = email;
    //     this.password = password;
    // }

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}

export class LoginData {
    email: string;
    password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}

export class UserData {
    displayName: string;
    email: string;

    constructor(displayName: string, email: string) {
        this.displayName = displayName;
        this.email = email;
    }
}
