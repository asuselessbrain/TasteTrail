import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { IUser } from './auth.type';
import { User } from './auth.model';

const register = async (payload: IUser) => {
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

// const login = async (payload: { email: string; password: string }) => {
//   // checking if the user is exist
//   const user = await User.findOne({ email: payload?.email }).select(
//     '+password',
//   );

//   if (!user) {
//     throw new Error('user not found !');
//   }

//   // checking if the user is blocked
//   const userStatus = user?.userStatus;

//   if (userStatus === 'blocked') {
//     throw new Error('User is blocked ! !');
//   }

//   //checking if the password is correct
//   const isPasswordMatched = await bcrypt.compare(
//     payload?.password,
//     user?.password,
//   );

//   if (!isPasswordMatched) {
//     throw new Error('Wrong Password!!! 😈');
//   }

//   const jwtPayload = {
//     email: user?.email,
//     role: user?.role,
//   };

//   const token = jwt.sign(jwtPayload, config.jwt_secret as string, {
//     expiresIn: '1d',
//   });

//   const refreshToken = jwt.sign(
//     jwtPayload,
//     config.jwt_refresh_secret as string,
//     {
//       expiresIn: '7d',
//     },
//   );
//   return { token, user, refreshToken };
// };


export const AuthService = {
  register,
  // login
};
