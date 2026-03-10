import { Router } from 'express';

import authRoutes from './auth.routes';
import categoryRoutes from './category.routes';
import mediaRoutes from './media.routes';

const apiRoutes = Router();

apiRoutes.get('/live', (_req, res) => {
  res.json({
    message: 'API is live',
    data: null,
  });
});

apiRoutes.use('/auth', authRoutes);
apiRoutes.use('/media', mediaRoutes);
apiRoutes.use('/categories', categoryRoutes);

export default apiRoutes;
