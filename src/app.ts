import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';

import { swaggerSpec } from './docs/swagger';
import errorMiddleware from './middlewares/error-.middleware';
import notFoundMiddleware from './middlewares/not-found.middleware';
import apiRoutes from './routes/api';

const app = express();

app.use(helmet());
app.use(cors());

app.use(express.json());

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCssUrl: 'https://unpkg.com/swagger-ui-dist/swagger-ui.css',
    customJs: 'https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js',
  })
);

app.use('/api', apiRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
