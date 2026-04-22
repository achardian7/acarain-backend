import { Router } from 'express';

import TicketController from '../controllers/ticket.controller';
import aclMiddleware from '../middlewares/acl.middleware';
import authenticate from '../middlewares/authenticate.middleware';
import { ROLES } from '../utils/constant';

const ticketRoutes = Router();

ticketRoutes.post(
  '/',
  authenticate,
  aclMiddleware([ROLES.ADMIN]),
  TicketController.create
);

ticketRoutes.get('/', TicketController.findAll);

ticketRoutes.get('/:id', TicketController.findOne);

ticketRoutes.put(
  '/:id',
  authenticate,
  aclMiddleware([ROLES.ADMIN]),
  TicketController.update
);

ticketRoutes.delete(
  '/:id',
  authenticate,
  aclMiddleware([ROLES.ADMIN]),
  TicketController.remove
);

ticketRoutes.get('/:eventId/events', TicketController.findAllByEvents);

export default ticketRoutes;
