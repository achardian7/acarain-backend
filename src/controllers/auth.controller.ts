import UserModel from '../models/user.model';
import { AppError } from '../utils/app-error';
import { asyncHandler } from '../utils/async-handler';
import { registerValidateSchema } from '../validations/auth.validation';

export default class AuthController {
  public static register = asyncHandler(async (req, res, _next) => {
    const body = registerValidateSchema.parse(req.body);

    const { fullName, username, email, password } = body;

    const existingUser = await UserModel.findOne({
      $or: [
        {
          email,
        },
        {
          username,
        },
      ],
    });

    if (existingUser)
      throw new AppError('Email or username already in use', 409);

    const result = await UserModel.create({
      fullName,
      username,
      email,
      password,
    });

    res.status(201).json({
      message: 'Success registration',
      data: result,
    });
  });
}
