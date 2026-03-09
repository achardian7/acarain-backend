/**
 * @swagger
 * components:
 *   schemas:
 *     Meta:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Success get user profile
 *         status:
 *           type: number
 *           example: 200
 *
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         meta:
 *           $ref: '#/components/schemas/Meta'
 *         data:
 *           nullable: true
 *
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 665fa1b4c1a9e0f9c5e8f123
 *         fullName:
 *           type: string
 *           example: John Doe
 *         username:
 *           type: string
 *           example: johndoe
 *         email:
 *           type: string
 *           example: johndoe@email.com
 */
