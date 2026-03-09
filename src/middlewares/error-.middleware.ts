import { ErrorRequestHandler } from 'express';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { ZodError } from 'zod';

import { AppError } from '../utils/app-error';

const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  console.log(err);
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: err.issues.map(e => e.message).join(', '),
      data: err.flatten().fieldErrors,
    });
  }

  if (err instanceof TokenExpiredError) {
    return res.status(401).json({
      message: 'Token expired',
      data: null,
    });
  }

  if (err instanceof JsonWebTokenError) {
    return res.status(401).json({
      message: 'Invalid token',
      data: null,
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
      data: null,
    });
  }

  return res.status(500).json({
    message: 'Internal Server Error',
    data: null,
  });
};

export default errorMiddleware;
