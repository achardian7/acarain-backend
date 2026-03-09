import { Response } from 'express';

type Pagination = {
  totalPages: number;
  current: number;
  total: number;
};

export default {
  success(res: Response, data: any, message: string, status: 200 | 201 = 200) {
    res.status(status).json({
      meta: {
        message,
        status,
      },
      data,
    });
  },

  pagination(
    res: Response,
    data: any[],
    pagination: Pagination,
    message: string
  ) {
    res.status(200).json({
      meta: {
        message,
        status: 200,
      },
      data,
      pagination,
    });
  },
};
