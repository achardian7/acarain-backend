import jwt from 'jsonwebtoken';

import env from './env';
import { IUserToken } from './interfaces';

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
