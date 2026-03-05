import { NextFunction, Request, Response } from 'express';

import { AppError } from '../utils/app-error';

const notFoundMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next(new AppError(`Route ${req.originalUrl} is not found`, 404));
};

export default notFoundMiddleware;
