import { Router } from 'express';

import BannerController from '../controllers/banner.controller';
import aclMiddleware from '../middlewares/acl.middleware';
import authenticate from '../middlewares/authenticate.middleware';
import { ROLES } from '../utils/constant';

const bannerRoutes = Router();

bannerRoutes.post(
  '/',
  authenticate,
  aclMiddleware([ROLES.ADMIN]),
  BannerController.create
);

bannerRoutes.get('/', BannerController.findAll);
bannerRoutes.get('/:id', BannerController.findOne);
bannerRoutes.put(
  '/:id',
  authenticate,
  aclMiddleware([ROLES.ADMIN]),
  BannerController.update
);

bannerRoutes.delete(
  '/:id',
  authenticate,
  aclMiddleware([ROLES.ADMIN]),
  BannerController.remove
);

export default bannerRoutes;
