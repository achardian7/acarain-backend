import { Router } from 'express';

import RegionController from '../controllers/region.controller';

const regionRoutes = Router();

/**
 * @swagger
 * /regions:
 *   get:
 *     summary: Get all provinces
 *     tags: [Region]
 *     responses:
 *       200:
 *         description: Success get all provinces
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
 *                     $ref: '#/components/schemas/Region'
 */
regionRoutes.get('/', RegionController.getAllProvinces);

/**
 * @swagger
 * /regions/{id}/province:
 *   get:
 *     summary: Get province by id
 *     tags: [Region]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *           example: 35
 *     responses:
 *       200:
 *         description: Success get a province
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 meta:
 *                   $ref: '#/components/schemas/Meta'
 *                 data:
 *                   $ref: '#/components/schemas/Region'
 */
regionRoutes.get('/:id/province', RegionController.getProvince);

/**
 * @swagger
 * /regions/{id}/regency:
 *   get:
 *     summary: Get regencies by province id
 *     tags: [Region]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *           example: 35
 *     responses:
 *       200:
 *         description: Success get regencies
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
 *                     $ref: '#/components/schemas/Region'
 */
regionRoutes.get('/:id/regency', RegionController.getRegency);

/**
 * @swagger
 * /regions/{id}/district:
 *   get:
 *     summary: Get districts by regency id
 *     tags: [Region]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *           example: 3578
 *     responses:
 *       200:
 *         description: Success get districts
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
 *                     $ref: '#/components/schemas/Region'
 */
regionRoutes.get('/:id/district', RegionController.getDistrict);

/**
 * @swagger
 * /regions/{id}/village:
 *   get:
 *     summary: Get villages by district id
 *     tags: [Region]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *           example: 357801
 *     responses:
 *       200:
 *         description: Success get villages
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
 *                     $ref: '#/components/schemas/Region'
 */
regionRoutes.get('/:id/village', RegionController.getVillage);

/**
 * @swagger
 * /regions/search/{name}:
 *   get:
 *     summary: Search region by city name
 *     tags: [Region]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *           example: Surabaya
 *     responses:
 *       200:
 *         description: Success get region by city name
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
 *                     $ref: '#/components/schemas/Region'
 */
regionRoutes.get('/search/:name', RegionController.findByCity);

export default regionRoutes;
