import { IReqUser } from '../middlewares/authenticate.middleware';
import UserModel from '../models/user.model';
import { UserRole } from '../types/auth';
import { AppError } from '../utils/app-error';
import { asyncHandler } from '../utils/async-handler';
import { encrypt } from '../utils/encrypt';
import { generateToken } from '../utils/jwt';
import {
  activationValidateSchema,
  loginValidateSchema,
  registerValidateSchema,
} from '../validations/auth.validation';

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

  public static login = asyncHandler(async (req, res, _next) => {
    const body = loginValidateSchema.parse(req.body);

    const { identifier, password } = body;

    const userByIdentifier = await UserModel.findOne({
      $or: [
        {
          email: identifier,
        },
        {
          username: identifier,
        },
      ],
      isActive: true,
    });

    if (!userByIdentifier) throw new AppError('Invalid credentials', 403);

    const validatePassword = encrypt(password) === userByIdentifier.password;

    if (!validatePassword) throw new AppError('Invalid credentials', 403);

    const token = generateToken({
      id: userByIdentifier._id,
      role: userByIdentifier.role as UserRole,
    });

    res.status(200).json({
      message: 'Login success',
      data: token,
    });
  });

  public static me = asyncHandler(async (req: IReqUser, res, _next) => {
    const user = req.user;

    const result = await UserModel.findById(user?.id);

    res.status(200).json({
      message: 'Success get user profile',
      data: result,
    });
  });

  public static activation = asyncHandler(async (req, res, next) => {
    const body = activationValidateSchema.parse(req.body);

    const { code } = body;

    const user = await UserModel.findOneAndUpdate(
      {
        activationCode: code,
      },
      {
        isActive: true,
      },
      {
        new: true,
      }
    );

    if (!user) {
      throw new AppError('Invalid activation code', 400);
    }

    res.status(200).json({
      message: 'User successfully activated',
      data: user,
    });
  });
}
