import { Router } from 'express';

import RegionController from '../controllers/region.controller';

const regionRoutes = Router();

regionRoutes.get('/', RegionController.getAllProvinces);
regionRoutes.get('/:id/province', RegionController.getProvince);
regionRoutes.get('/:id/regency', RegionController.getRegency);
regionRoutes.get('/:id/district', RegionController.getDistrict);
regionRoutes.get('/:id/village', RegionController.getVillage);
regionRoutes.get('/:region-search', RegionController.findByCity);

export default regionRoutes;
