import mongoose, { Types, isValidObjectId } from 'mongoose';

import TicketModel from '../models/ticket.model';
import { AppError } from '../utils/app-error';
import { asyncHandler } from '../utils/async-handler';
import { IPaginationQuery } from '../utils/interfaces';
import response from '../utils/response';
import {
  ticketSchema,
  updateTicketSchema,
} from '../validations/ticket.validation';

export default class TicketController {
  public static create = asyncHandler(async (req, res, _next) => {
    const body = ticketSchema.parse(req.body);

    const result = await TicketModel.create(body);

    response.success(res, result, 'Success create a ticket');
  });

  public static findAll = asyncHandler(async (req, res, _next) => {
    const { limit, page, search } = req.query as unknown as IPaginationQuery;

    const query = {};

    if (search) {
      Object.assign(query, {
        ...query,
        $text: {
          $search: search,
        },
      });
    }

    const result = await TicketModel.find(query)
      .populate('events')
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })
      .exec();

    const count = await TicketModel.countDocuments(query);

    response.pagination(
      res,
      result,
      { current: page, total: count, totalPages: Math.ceil(count / limit) },
      'Success find all tickets'
    );
  });

  public static findOne = asyncHandler(async (req, res, _next) => {
    const { id } = req.params;

    if (!isValidObjectId(id))
      throw new AppError('Failed to find one ticket', 404);

    const result = await TicketModel.findById(id);

    if (!result) throw new AppError('Failed to find one ticket', 404);

    response.success(res, result, 'success find one a ticket');
  });

  public static update = asyncHandler(async (req, res, _next) => {
    const { id } = req.params;

    if (!isValidObjectId(id))
      throw new AppError('Failed to update ticket', 404);

    const body = updateTicketSchema.parse(req.body);

    const result = await TicketModel.findByIdAndUpdate(id, body, { new: true });

    response.success(res, result, 'success update a ticket');
  });

  public static remove = asyncHandler(async (req, res, _next) => {
    const { id } = req.params;

    if (!isValidObjectId(id))
      throw new AppError('Failed to update ticket', 404);

    const result = await TicketModel.findByIdAndDelete(id);

    response.success(res, result, 'success remove a ticket');
  });

  public static findAllByEvents = asyncHandler(async (req, res, _next) => {
    const rawEventId = req.params.eventId;

    if (Array.isArray(rawEventId)) {
      throw new AppError('Invalid event id', 400);
    }

    if (!isValidObjectId(rawEventId))
      throw new AppError('Tickets not found', 404);

    const eventId = new mongoose.Types.ObjectId(rawEventId);

    const result = await TicketModel.find({ events: eventId }).exec();

    response.success(res, result, 'success find all tickets by event');
  });
}
