import {
  IGetVehiclesIDsToDeleteParams, IVehicleIdRecord,
} from '../types/shared';


const getVehiclesIDsToDelete = async ({
  vehiclesDB, coordsToPurge,
}: IGetVehiclesIDsToDeleteParams) => {
  await vehiclesDB.open();

  const selectVehiclesId = 'SELECT id FROM vehicles where wx BETWEEN ? AND ? AND wy BETWEEN ? AND ?';
  const queryParams = coordsToPurge.map(coords => {
    const {
      start, end,
    } = coords;
    return [
      start.x, end.x, end.y, start.y,
    ];
  }, [] as number[]);

  let vehiclesIDs: number[] = [];
  for (const params of queryParams) {
    const records = await vehiclesDB.runQuery<IVehicleIdRecord>(selectVehiclesId, params);
    if (!records.length) continue;

    const currentVehiclesIDs = records.map(record => record.id);
    vehiclesIDs = [
      ...vehiclesIDs, ...currentVehiclesIDs,
    ];
  }

  return vehiclesIDs;
};

export default getVehiclesIDsToDelete;
