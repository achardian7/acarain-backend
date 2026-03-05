import { Router } from 'express';

import authRoutes from './auth.routes';

const apiRoutes = Router();

apiRoutes.get('/live', (_req, res) => {
  res.json({
    message: 'API is live',
    data: null,
  });
});

apiRoutes.use('/auth', authRoutes);

export default apiRoutes;
