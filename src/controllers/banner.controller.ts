import { isValidObjectId } from 'mongoose';

import BannerModel from '../models/banner.model';
import { AppError } from '../utils/app-error';
import { asyncHandler } from '../utils/async-handler';
import { IPaginationQuery } from '../utils/interfaces';
import response from '../utils/response';
import {
  bannerSchema,
  updateBannerSchema,
} from '../validations/banner.validation';

export default class BannerController {
  public static create = asyncHandler(async (req, res, _next) => {
    const body = bannerSchema.parse(req.body);

    const result = await BannerModel.create(body);

    response.success(res, result, 'success creating a banner', 201);
  });

  public static findAll = asyncHandler(async (req, res, _next) => {
    const { page, limit, search } = req.query as unknown as IPaginationQuery;

    const query = {};

    if (search) {
      Object.assign(query, {
        ...query,
        $text: {
          $search: search,
        },
      });
    }

    const result = await BannerModel.find(query)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })
      .exec();

    const count = await BannerModel.countDocuments(query);

    response.pagination(
      res,
      result,
      {
        current: page,
        total: count,
        totalPages: Math.ceil(count / limit),
      },
      'success find all banners'
    );
  });

  public static findOne = asyncHandler(async (req, res, _next) => {
    const { id } = req.params;

    if (!isValidObjectId(id))
      throw new AppError('failed to find one banner', 400);

    const result = await BannerModel.findById(id);

    if (!result) throw new AppError('Banner is not found', 404);

    response.success(res, result, 'success find a banner');
  });

  public static update = asyncHandler(async (req, res, _next) => {
    const body = updateBannerSchema.parse(req.body);

    const { id } = req.params;

    if (!isValidObjectId(id))
      throw new AppError('failed to update banner', 400);

    const result = await BannerModel.findByIdAndUpdate(id, body, { new: true });

    response.success(res, result, 'success update ticket');
  });

  public static remove = asyncHandler(async (req, res, _next) => {
    const { id } = req.params;

    if (!isValidObjectId(id))
      throw new AppError('failed to delete banner', 400);

    const result = await BannerModel.findByIdAndDelete(id);

    response.success(res, result, 'success delate banner');
  });
}
