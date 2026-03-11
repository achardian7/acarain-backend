import { Router } from 'express';

import EventController from '../controllers/event.controller';
import aclMiddleware from '../middlewares/acl.middleware';
import authenticate from '../middlewares/authenticate.middleware';
import { ROLES } from '../utils/constant';

const eventRoutes = Router();

eventRoutes.post(
  '/',
  authenticate,
  aclMiddleware([ROLES.ADMIN]),
  EventController.create
);

eventRoutes.get('/', EventController.findAll);
eventRoutes.get('/:id', EventController.findOne);
eventRoutes.put(
  '/:id',
  authenticate,
  aclMiddleware([ROLES.ADMIN]),
  EventController.update
);
eventRoutes.delete(
  '/:id',
  authenticate,
  aclMiddleware([ROLES.ADMIN]),
  EventController.remove
);
eventRoutes.get('/:slug/slug', EventController.findOneBySlug);

export default eventRoutes;
