export type LoginResponse = {
    token: string;
    user: User;
}

export type LoginInput ={
    email: string;
    password: string;
}

export type User = {
    name: string;
    email: string;
}