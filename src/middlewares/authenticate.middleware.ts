import { NextFunction, Request, Response } from 'express';

import { AppError } from '../utils/app-error';
import { IUserToken, getUserData } from '../utils/jwt';

export interface IReqUser extends Request {
  user?: IUserToken;
}

const authenticate = (req: IReqUser, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;

  if (!authorization) throw new AppError('Unauthorized', 403);

  const [prefix, accessToken] = authorization.split(' ');

  if (!(prefix === 'Bearer' && accessToken))
    throw new AppError('Unauthorized', 403);

  const user = getUserData(accessToken);

  if (!user) throw new AppError('Unauthorized', 403);

  req.user = user;

  next();
};

export default authenticate;
