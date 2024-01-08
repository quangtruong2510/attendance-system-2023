import { Roles } from "../utils/role";

export interface Account {
    [key: number | string]: string | number | boolean | undefined;
    id?: number;
    email?: string;
    nameTeacher?: string;
    role?: Roles;
    password?: string;
    teacherId?: number;
}