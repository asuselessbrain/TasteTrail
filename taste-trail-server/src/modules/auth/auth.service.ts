import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config';
import { IUser } from './auth.type';
import { User } from './auth.model';
import AppError from '../../errors/AppError';
import { StringValue } from "ms";

const register = async (payload: IUser) => {

  const isEmailExist = await User.find({ email: payload.email })

  if(isEmailExist){
    throw new AppError(409, "User with this email already exists")
  }
  const hashedPassword = await bcrypt.hash(payload.password, Number(config.bcrypt_salt_rounds))
  const userData = {
    fullName: payload.fullName,
    email: payload.email,
    password: hashedPassword,
    profilePhoto: payload.profilePhoto
  }
  const user = new User(userData);
  return user.save();
};

const login = async (payload: { email: string; password: string }) => {
  const user = await User.findOne({ email: payload?.email }).select(
    '+password',
  );

  if (!user) {
    throw new Error('user not found !');
  }

  //checking if the password is correct
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password,
  );

  if (!isPasswordMatched) {
    throw new Error('Wrong Password!!! 😈');
  }

  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  const token = jwt.sign(jwtPayload, config.jwt.token_secret as string, {
    expiresIn: config.jwt.token_expires_in as StringValue,
  });

  return { token, user };
};

const logout = async () => {
    return null
}


export const AuthService = {
  register,
  login,
  logout
};
