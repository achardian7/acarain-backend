import RegionModel from '../models/region.model';
import { asyncHandler } from '../utils/async-handler';
import response from '../utils/response';

export default class RegionController {
  public static findByCity = asyncHandler(async (req, res, _next) => {
    const { name } = req.query;
    const result = await RegionModel.findByCity(`${name}`);
    response.success(res, result, 'success get region by city name');
  });

  public static getAllProvinces = asyncHandler(async (req, res, _next) => {
    const result = await RegionModel.getAllProvinces();
    response.success(res, result, 'success get all provinces');
  });

  public static getProvince = asyncHandler(async (req, res, _next) => {
    const { id } = req.params;
    const result = await RegionModel.getProvince(Number(id));
    response.success(res, result, 'success get a province');
  });

  public static getRegency = asyncHandler(async (req, res, _next) => {
    const { id } = req.params;
    const result = await RegionModel.getRegency(Number(id));
    response.success(res, result, 'success get regencies');
  });

  public static getDistrict = asyncHandler(async (req, res, _next) => {
    const { id } = req.params;
    const result = await RegionModel.getDistrict(Number(id));
    response.success(res, result, 'success get districts');
  });

  public static getVillage = asyncHandler(async (req, res, _next) => {
    const { id } = req.params;
    const result = await RegionModel.getVillage(Number(id));
    response.success(res, result, 'success get villages');
  });
}
