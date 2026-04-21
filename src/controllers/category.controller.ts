import { isValidObjectId } from 'mongoose';

import CategoryModel from '../models/category.model';
import { AppError } from '../utils/app-error';
import { asyncHandler } from '../utils/async-handler';
import { IPaginationQuery } from '../utils/interfaces';
import response from '../utils/response';
import {
  categorySchema,
  updateCategorySchema,
} from '../validations/category.validation';

export default class CategoryCotroller {
  public static create = asyncHandler(async (req, res, _next) => {
    const body = categorySchema.parse(req.body);

    const result = await CategoryModel.create(body);

    response.success(res, result, 'Success create new category', 201);
  });

  public static findOne = asyncHandler(async (req, res, _next) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) throw new AppError('Invalid id param', 400);

    const result = await CategoryModel.findById(id);

    if (!result) throw new AppError('Category is not found', 404);

    response.success(res, result, 'Success find one category');
  });

  public static findAll = asyncHandler(async (req, res, _next) => {
    const {
      page = 1,
      limit = 10,
      search,
    } = req.query as unknown as IPaginationQuery;

    const query = {};

    if (search) {
      Object.assign(query, {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          {
            description: {
              $regex: search,
              $options: 'i',
            },
          },
        ],
      });
    }

    const skip = (page - 1) * limit;

    const result = await CategoryModel.find(query)
      .limit(limit)
      .skip(skip)
      .sort({ cretedAt: -1 })
      .exec();

    const count = await CategoryModel.countDocuments(query);

    response.pagination(
      res,
      result,
      {
        current: Number(page),
        total: count,
        totalPages: Math.ceil(count / limit),
      },
      'Success find all category'
    );
  });

  public static update = asyncHandler(async (req, res, _next) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) throw new AppError('Invalid id param', 400);

    const body = updateCategorySchema.parse(req.body);

    const result = await CategoryModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    response.success(res, result, 'Success update category');
  });

  public static remove = asyncHandler(async (req, res, _next) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) throw new AppError('Invalid id param', 400);

    const result = await CategoryModel.findByIdAndDelete(id);

    response.success(res, result, 'Success remove category');
  });
}
