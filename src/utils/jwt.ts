import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

import { UserRole } from '../types/auth';
import env from './env';

export interface IUserToken {
  id: Types.ObjectId;
  role: UserRole;
}

export const generateToken = (user: IUserToken): string => {
  const token = jwt.sign(user, env.SECRET, {
    expiresIn: '1h',
  });

  return token;
};

export const getUserData = (token: string) => {
  const user = jwt.verify(token, env.SECRET) as IUserToken;

  return user;
};
