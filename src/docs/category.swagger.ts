/**
 * @swagger
 * components:
 *   schemas:
 *     CreateCategoryRequest:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - icon
 *       properties:
 *         name:
 *           type: string
 *           example: Music
 *         description:
 *           type: string
 *           example: Category for music events
 *         icon:
 *           type: string
 *           example: music
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 665fa1b4c1a9e0f9c5e8f123
 *         name:
 *           type: string
 *           example: Music
 *         description:
 *           type: string
 *           example: Category for music events
 *         icon:
 *           type: string
 *           example: music
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
