import { RoleEnum } from "../enums/user.enum";

export interface User {
    name?: string;
    email: string;
    password: string;
    age?: number;
    dateOfBirth?: Date
    ProfileImage?: string;
    role?: RoleEnum;
    active: boolean;
}

export interface UserLogin {
    email: string;
    password: string;
}