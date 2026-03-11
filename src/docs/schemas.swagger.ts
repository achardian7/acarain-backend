/**
 * @swagger
 * components:
 *   schemas:
 *     Meta:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Success
 *         status:
 *           type: number
 *           example: 200
 *
 *     Pagination:
 *       type: object
 *       properties:
 *         current:
 *           type: number
 *           example: 1
 *         total:
 *           type: number
 *           example: 50
 *         totalPages:
 *           type: number
 *           example: 5
 *
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
 *
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
 *
 *     UpdateCategoryRequest:
 *       type: object
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
 *     Media:
 *       type: object
 *       properties:
 *         public_id:
 *           type: string
 *           example: acarain/events/banner_123
 *         secure_url:
 *           type: string
 *           example: https://res.cloudinary.com/demo/image/upload/banner.jpg
 *         url:
 *           type: string
 *           example: http://res.cloudinary.com/demo/image/upload/banner.jpg
 *         format:
 *           type: string
 *           example: jpg
 *         resource_type:
 *           type: string
 *           example: image
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Region:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 35
 *         name:
 *           type: string
 *           example: Jawa Timur
 *         province_id:
 *           type: number
 *           example: 35
 *         regency_id:
 *           type: number
 *           example: 3578
 *         district_id:
 *           type: number
 *           example: 357801
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     EventLocation:
 *       type: object
 *       properties:
 *         region:
 *           type: number
 *           example: 3578
 *         coordinates:
 *           type: array
 *           items:
 *             type: number
 *           example: [112.7521, -7.2575]
 *         address:
 *           type: string
 *           example: Surabaya Convention Center
 *
 *     EventInput:
 *       type: object
 *       required:
 *         - name
 *         - startDate
 *         - endDate
 *         - description
 *         - banner
 *         - isFeatured
 *         - isOnline
 *         - isPublish
 *         - category
 *       properties:
 *         name:
 *           type: string
 *           example: Tech Conference 2026
 *         startDate:
 *           type: string
 *           example: 2026-08-10
 *         endDate:
 *           type: string
 *           example: 2026-08-12
 *         description:
 *           type: string
 *           example: The biggest tech conference in Indonesia
 *         banner:
 *           type: string
 *           example: https://res.cloudinary.com/demo/banner.jpg
 *         isFeatured:
 *           type: boolean
 *           example: false
 *         isOnline:
 *           type: boolean
 *           example: false
 *         isPublish:
 *           type: boolean
 *           example: true
 *         category:
 *           type: string
 *           example: 682ba9c6e98a3f1f0d08f123
 *         location:
 *           $ref: '#/components/schemas/EventLocation'
 *
 *     Event:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 682ba9c6e98a3f1f0d08f456
 *         name:
 *           type: string
 *         startDate:
 *           type: string
 *         endDate:
 *           type: string
 *         description:
 *           type: string
 *         banner:
 *           type: string
 *         isFeatured:
 *           type: boolean
 *         isOnline:
 *           type: boolean
 *         isPublish:
 *           type: boolean
 *         slug:
 *           type: string
 *           example: tech-conference-2026
 *         category:
 *           type: string
 *         createdBy:
 *           type: string
 *         location:
 *           $ref: '#/components/schemas/EventLocation'
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 */
