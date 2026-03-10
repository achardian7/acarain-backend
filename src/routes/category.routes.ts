import { Router } from 'express';

import CategoryController from '../controllers/category.controller';
import aclMiddleware from '../middlewares/acl.middleware';
import authenticate from '../middlewares/authenticate.middleware';
import { ROLES } from '../utils/constant';

const categoryRoutes = Router();

categoryRoutes.post(
  '/',
  authenticate,
  aclMiddleware([ROLES.ADMIN]),
  CategoryController.create
);

categoryRoutes.get('/', CategoryController.findAll);

categoryRoutes.get('/:id', CategoryController.findOne);

categoryRoutes.put(
  '/:id',
  authenticate,
  aclMiddleware([ROLES.ADMIN]),
  CategoryController.update
);

categoryRoutes.delete(
  '/:id',
  authenticate,
  aclMiddleware([ROLES.ADMIN]),
  CategoryController.remove
);

export default categoryRoutes;
