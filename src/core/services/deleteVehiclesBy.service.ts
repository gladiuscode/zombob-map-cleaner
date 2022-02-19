import { IDeleteVehiclesByParams } from '../types/shared';

const deleteVehiclesBy = async ({
  vehiclesDB, vehiclesIDsToDelete,
}: IDeleteVehiclesByParams) => {
  const ids = vehiclesIDsToDelete.join(', ');
  const deleteVehiclesByIds = `DELETE FROM vehicles WHERE id IN ( ${ids} )`;
  await vehiclesDB.runQuery(deleteVehiclesByIds);
};

export default deleteVehiclesBy;
