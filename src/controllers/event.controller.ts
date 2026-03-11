import { QueryFilter, isValidObjectId } from 'mongoose';

import EventModel, { Event } from '../models/event.model';
import { AppError } from '../utils/app-error';
import { asyncHandler } from '../utils/async-handler';
import { IPaginationQuery, IReqUser } from '../utils/interfaces';
import response from '../utils/response';
import {
  eventSchema,
  updateEventSchema,
} from '../validations/event.validation';

export default class EventController {
  public static create = asyncHandler(async (req: IReqUser, res, _next) => {
    const body = eventSchema.parse(req.body);

    const payload = { ...body, createdBy: req.user?.id };

    const result = await EventModel.create(payload);

    response.success(res, result, 'Success create an event', 201);
  });

  public static findAll = asyncHandler(async (req, res, _next) => {
    const {
      page = 1,
      limit = 10,
      search,
    } = req.query as unknown as IPaginationQuery;

    const query: QueryFilter<Event> = {};

    if (search) {
      Object.assign(query, {
        ...query,
        $text: {
          $search: search,
        },
      });
    }

    const skip = (page - 1) * limit;

    const result = await EventModel.find(query)
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })
      .exec();

    const count = await EventModel.countDocuments(query);

    response.pagination(
      res,
      result,
      {
        current: page,
        total: count,
        totalPages: Math.ceil(count / limit),
      },
      'Success find all events'
    );
  });

  public static findOne = asyncHandler(async (req, res, _next) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) throw new AppError('Invalid event id', 400);

    const result = await EventModel.findById(id);

    if (!result) throw new AppError('Event not found', 404);

    response.success(res, result, 'Success find event');
  });

  public static update = asyncHandler(async (req, res, _next) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) throw new AppError('Invalid event id', 400);

    const body = updateEventSchema.parse(req.body);

    const result = await EventModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    response.success(res, result, 'Success update an event');
  });

  public static remove = asyncHandler(async (req, res, _next) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) throw new AppError('Invalid event id', 400);

    const result = await EventModel.findByIdAndDelete(id);

    response.success(res, result, 'Success delete an event');
  });

  public static findOneBySlug = asyncHandler(async (req, res, _next) => {
    const { slug } = req.params;

    const result = await EventModel.findOne({ slug });

    if (!result) throw new AppError('Event not found', 404);

    response.success(res, result, 'Success find an event');
  });
}
