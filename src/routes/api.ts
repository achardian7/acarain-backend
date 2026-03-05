import { Router } from 'express';

const apiRoutes = Router();

apiRoutes.get('/live', (_req, res) => {
  res.json({
    message: 'API is live',
    data: null,
  });
});

export default apiRoutes;
