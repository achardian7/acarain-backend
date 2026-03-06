import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

import { AppError } from '../utils/app-error';

const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ZodError) {
    // const formattedErrors = err.issues.map(issue => ({
    //   field: issue.path.join('.'),
    //   message: issue.message,
    // }));

    return res.status(400).json({
      message: err.issues.map(e => e.message).join(', '),
      data: err.flatten().fieldErrors,
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
