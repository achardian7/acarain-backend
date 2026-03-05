/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - fullName
 *         - username
 *         - email
 *         - password
 *       properties:
 *         fullName:
 *           type: string
 *           example: John Doe
 *         username:
 *           type: string
 *           example: johndoe
 *         email:
 *           type: string
 *           format: email
 *           example: johndoe@email.com
 *         password:
 *           type: string
 *           format: password
 *           example: secret123
 *         confirmPassword:
 *           type: string
 *           format: password
 *           example: secret123
 *
 *     LoginRequest:
 *       type: object
 *       required:
 *         - identifier
 *         - password
 *       properties:
 *         identifier:
 *           type: string
 *           description: username or email
 *           example: johndoe
 *         password:
 *           type: string
 *           format: password
 *           example: secret123
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
 *
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Success
 *         data:
 *           nullable: true
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Error message
 *         data:
 *           nullable: true
 *           example: null
 *
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
