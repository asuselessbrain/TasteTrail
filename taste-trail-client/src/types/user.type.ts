export type UserRole = "admin" | "user"
export interface IUser {
    email: string;
    role: UserRole;
    exp: number;
    iat: number;
}