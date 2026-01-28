import { USER_ROLE } from "./user.contant";

export type IUser = {
  fullName: string;
  email: string;
  profilePhoto: string;
  password: string;
  role?: 'admin' | 'user'
};

export type TUserRole = keyof typeof USER_ROLE;

