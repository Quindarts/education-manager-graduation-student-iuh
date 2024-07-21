import { ResponseType } from "../axios.type";

export interface IAuth {
    username: string;
    password: string;
}

export interface IRegister extends IAuth {
    email: string;
    role: string;
}

export interface User {
    id?: string;
    username?: string;
    fullName?: string;
    phone?: string;
    email?: string;
    gender?: string;
    degree?: string;
    isActive?: boolean;
    majorId?: string;
    majorName?: string;
}
export interface IListToken {
    accessToken: string;
    refreshToken: string;
}

export type LoginResponse = Pick<ResponseType, 'success' | 'message' | 'user' | 'roles'> & IListToken
