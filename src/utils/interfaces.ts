import { Request } from 'express';
import { Types } from 'mongoose';

import { UserRole } from '../types/auth';

export interface IUserToken {
  id: Types.ObjectId;
  role: UserRole;
}

export interface IReqUser extends Request {
  user?: IUserToken;
}

export interface IPaginationQuery {
  page: number;
  limit: number;
  search?: string;
}
