export type AuthNewUser = {
    name: string;
    email: string;
    password: string;
};

export type AuthLogin = {
    email: string;
    password: string;
};