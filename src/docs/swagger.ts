import swaggerJsDoc from 'swagger-jsdoc';

const options: swaggerJsDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Acarain API',
      version: '1.0.0',
      description: 'Acarain API Documentation',
    },
    servers: [
      {
        url: 'http://localhost:8080/api',
      },
      {
        url: 'https://acarain-backend.vercel.app/api',
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts', './src/docs/*.ts'],
};

export const swaggerSpec = swaggerJsDoc(options);
