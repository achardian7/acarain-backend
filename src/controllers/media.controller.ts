import { AppError } from '../utils/app-error';
import { asyncHandler } from '../utils/async-handler';
import { IReqUser } from '../utils/interfaces';
import uploader from '../utils/uploader';

export default class MediaController {
  public static single = asyncHandler(async (req: IReqUser, res, _next) => {
    if (!req.file) throw new AppError('File is not exist', 400);

    const result = await uploader.uploadSingle(req.file as Express.Multer.File);

    res.status(200).json({
      message: 'Success upload file',
      data: result,
    });
  });

  public static multiple = asyncHandler(async (req: IReqUser, res, _next) => {
    if (!req.files || req.files.length === 0)
      throw new AppError('File is not exist', 400);

    const result = await uploader.uploadMultiple(
      req.files as Express.Multer.File[]
    );

    res.status(200).json({
      message: 'Success upload files',
      data: result,
    });
  });

  public static remove = asyncHandler(async (req: IReqUser, res, next) => {
    const { fileUrl }: { fileUrl: string } = req.body;

    if (!fileUrl) throw new AppError('File url is required', 400);

    const result = await uploader.remove(fileUrl);

    res.status(200).json({
      message: 'Success remove file',
      data: result,
    });
  });
}
