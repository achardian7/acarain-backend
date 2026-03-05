import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import errorMiddleware from './middlewares/error-.middleware';
import notFoundMiddleware from './middlewares/not-found.middleware';
import apiRoutes from './routes/api';
import connect from './utils/database';

const app = express();

const PORT = 8080;

const init = async () => {
  try {
    const result = await connect();

    console.log('Database status', result);

    app.use(helmet());
    app.use(cors());

    app.use(express.json());

    app.use('/api', apiRoutes);

    app.use(notFoundMiddleware);
    app.use(errorMiddleware);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

init();
