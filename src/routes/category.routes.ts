import { Router } from 'express';

import CategoryController from '../controllers/category.controller';
import aclMiddleware from '../middlewares/acl.middleware';
import authenticate from '../middlewares/authenticate.middleware';
import { ROLES } from '../utils/constant';

const categoryRoutes = Router();

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create new category
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategoryRequest'
 *     responses:
 *       201:
 *         description: Success create new category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 meta:
 *                   $ref: '#/components/schemas/Meta'
 *                 data:
 *                   $ref: '#/components/schemas/Category'
 */
categoryRoutes.post(
  '/',
  authenticate,
  aclMiddleware([ROLES.ADMIN]),
  CategoryController.create
);

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
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
 *           example: music
 *     responses:
 *       200:
 *         description: Success find all category
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
 *                     $ref: '#/components/schemas/Category'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 */
categoryRoutes.get('/', CategoryController.findAll);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get category by id
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Category ID
 *         schema:
 *           type: string
 *           example: 665fa1b4c1a9e0f9c5e8f123
 *     responses:
 *       200:
 *         description: Success find one category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 meta:
 *                   $ref: '#/components/schemas/Meta'
 *                 data:
 *                   $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category is not found
 */
categoryRoutes.get('/:id', CategoryController.findOne);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update category
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 665fa1b4c1a9e0f9c5e8f123
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCategoryRequest'
 *     responses:
 *       200:
 *         description: Success update category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 meta:
 *                   $ref: '#/components/schemas/Meta'
 *                 data:
 *                   $ref: '#/components/schemas/Category'
 */
categoryRoutes.put(
  '/:id',
  authenticate,
  aclMiddleware([ROLES.ADMIN]),
  CategoryController.update
);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete category
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 665fa1b4c1a9e0f9c5e8f123
 *     responses:
 *       200:
 *         description: Success remove category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 meta:
 *                   $ref: '#/components/schemas/Meta'
 *                 data:
 *                   $ref: '#/components/schemas/Category'
 */
categoryRoutes.delete(
  '/:id',
  authenticate,
  aclMiddleware([ROLES.ADMIN]),
  CategoryController.remove
);

export default categoryRoutes;
