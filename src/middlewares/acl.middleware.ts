import { NextFunction, Response } from 'express';

import { AppError } from '../utils/app-error';
import { IReqUser } from '../utils/interfaces';

export default (roles: string[]) => {
  return (req: IReqUser, _res: Response, next: NextFunction) => {
    const role = req.user?.role;

    if (!role || !roles.includes(role)) throw new AppError('Forbidden', 403);

    next();
  };
};
