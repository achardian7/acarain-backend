import { NextFunction, Response } from 'express';

import { AppError } from '../utils/app-error';
import { IReqUser } from '../utils/interfaces';
import { getUserData } from '../utils/jwt';

const authenticate = (req: IReqUser, _res: Response, next: NextFunction) => {
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
