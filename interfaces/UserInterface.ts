export interface User {
    username: string;
    password: string;
    hashedPassword: string;
    dateCreated: Date;
    dateUpdated: Date;
}

export const users: User[] = []
