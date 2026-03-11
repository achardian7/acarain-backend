import { Router } from 'express';

import MediaController from '../controllers/media.controller';
import aclMiddleware from '../middlewares/acl.middleware';
import authenticate from '../middlewares/authenticate.middleware';
import mediaMiddleware from '../middlewares/media.middleware';
import { ROLES } from '../utils/constant';

const mediaRoutes = Router();

/**
 * @swagger
 * /media/upload:
 *   post:
 *     summary: Upload single file
 *     tags: [Media]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Success upload file
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 meta:
 *                   $ref: '#/components/schemas/Meta'
 *                 data:
 *                   $ref: '#/components/schemas/Media'
 */
mediaRoutes.post(
  '/upload-single',
  authenticate,
  aclMiddleware([ROLES.ADMIN, ROLES.MEMBER]),
  mediaMiddleware.single('file'),
  MediaController.single
);

/**
 * @swagger
 * /media/uploads:
 *   post:
 *     summary: Upload multiple files
 *     tags: [Media]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - files
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Success upload files
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 meta:
 *                   $ref: '#/components/schemas/Meta'
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Media'
 */
mediaRoutes.post(
  '/upload-multiple',
  authenticate,
  aclMiddleware([ROLES.ADMIN, ROLES.MEMBER]),
  mediaMiddleware.multiple('files'),
  MediaController.multiple
);

/**
 * @swagger
 * /media/remove:
 *   delete:
 *     summary: Remove uploaded file
 *     tags: [Media]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fileUrl
 *             properties:
 *               fileUrl:
 *                 type: string
 *                 example: https://res.cloudinary.com/demo/image/upload/sample.jpg
 *     responses:
 *       201:
 *         description: Success remove file
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 meta:
 *                   $ref: '#/components/schemas/Meta'
 *                 data:
 *                   type: object
 *                   example:
 *                     result: ok
 */
mediaRoutes.delete(
  '/remove',
  authenticate,
  aclMiddleware([ROLES.ADMIN, ROLES.MEMBER]),
  MediaController.remove
);

export default mediaRoutes;
