import { Router } from 'express';

import MediaController from '../controllers/media.controller';
import aclMiddleware from '../middlewares/acl.middleware';
import authenticate from '../middlewares/authenticate.middleware';
import mediaMiddleware from '../middlewares/media.middleware';
import { ROLES } from '../utils/constant';

const mediaRoutes = Router();

mediaRoutes.post(
  '/upload-single',
  authenticate,
  aclMiddleware([ROLES.ADMIN, ROLES.MEMBER]),
  mediaMiddleware.single('file'),
  MediaController.single
);
mediaRoutes.post(
  '/upload-multiple',
  authenticate,
  aclMiddleware([ROLES.ADMIN, ROLES.MEMBER]),
  mediaMiddleware.multiple('files'),
  MediaController.multiple
);
mediaRoutes.delete(
  '/remove',
  authenticate,
  aclMiddleware([ROLES.ADMIN, ROLES.MEMBER]),
  MediaController.remove
);

export default mediaRoutes;
