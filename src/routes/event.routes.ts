import { Router } from 'express';

import EventController from '../controllers/event.controller';
import aclMiddleware from '../middlewares/acl.middleware';
import authenticate from '../middlewares/authenticate.middleware';
import { ROLES } from '../utils/constant';

const eventRoutes = Router();

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create a new event
 *     tags: [Event]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventInput'
 *     responses:
 *       201:
 *         description: Success create an event
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 meta:
 *                   $ref: '#/components/schemas/Meta'
 *                 data:
 *                   $ref: '#/components/schemas/Event'
 */
eventRoutes.post(
  '/',
  authenticate,
  aclMiddleware([ROLES.ADMIN]),
  EventController.create
);

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get all events with pagination
 *     tags: [Event]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *           example: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: music festival
 *     responses:
 *       200:
 *         description: Success find all events
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 meta:
 *                   $ref: '#/components/schemas/MetaPagination'
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Event'
 */
eventRoutes.get('/', EventController.findAll);

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Get event by id
 *     tags: [Event]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success find event
 *       404:
 *         description: Event not found
 */
eventRoutes.get('/:id', EventController.findOne);

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Update an event
 *     tags: [Event]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventInput'
 *     responses:
 *       200:
 *         description: Success update an event
 */
eventRoutes.put(
  '/:id',
  authenticate,
  aclMiddleware([ROLES.ADMIN]),
  EventController.update
);

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Delete an event
 *     tags: [Event]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success delete an event
 */
eventRoutes.delete(
  '/:id',
  authenticate,
  aclMiddleware([ROLES.ADMIN]),
  EventController.remove
);

/**
 * @swagger
 * /events/slug/{slug}:
 *   get:
 *     summary: Get event by slug
 *     tags: [Event]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *           example: music-festival-2025
 *     responses:
 *       200:
 *         description: Success find an event
 *       404:
 *         description: Event not found
 */
eventRoutes.get('/:slug/slug', EventController.findOneBySlug);

export default eventRoutes;
