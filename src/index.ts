import {
  getServerSavePath, setServerSave,
} from './config/paths';
import DatabaseService from './database/database.service';
import chooseServerSave from './core/services/chooseServerSave.service';
import deleteMapFiles from './core/services/deleteMapFiles.service';
import deleteVehiclesBy from './core/services/deleteVehiclesBy.service';
import getCoordsToPurge from './core/services/getCoordsToPurge.service';
import getMapFiles from './core/services/getMapFiles.service';
import getMapFilesToDelete from './core/services/getMapFilesToDelete.service';
import getVehiclesIDsToDelete from './core/services/getVehiclesIdToDelete.service';
import initializeRequirements from './core/services/initializeRequirements.service';
import path from 'path';

const main = async () => {
  console.info('[ ZOMBOB ] Map cleaner started');

  const initialized = await initializeRequirements();
  if (!initialized) {
    console.info('[ ZOMBOB ] Please provide coords to purge');
    return;
  }

  const serverSave = await chooseServerSave();
  setServerSave(serverSave);

  const mapFiles = await getMapFiles();
  console.info('[ ZOMBOB ] Map files');
  console.table(mapFiles);

  const coordsToPurge = await getCoordsToPurge();
  console.info('[ ZOMBOB ] Coords to purge');
  console.table(coordsToPurge);

  const mapFilesToDelete = getMapFilesToDelete({
    mapFiles,
    coordsToPurge,
  });
  console.info('[ ZOMBOB ] Map files to delete');
  console.table(mapFilesToDelete);

  await deleteMapFiles(mapFilesToDelete);
  console.info('[ ZOMBOB ] Map files deleted');

  const vehiclesDBPath = path.join( getServerSavePath(), 'vehicles.db' );
  const vehiclesDB = new DatabaseService(vehiclesDBPath);
  console.info('[ ZOMBOB ] Vehicles DB loaded');

  const vehiclesIDsToDelete = await getVehiclesIDsToDelete({
    vehiclesDB,
    coordsToPurge,
  });
  console.info('[ ZOMBOB ] Vehicles IDs to delete');
  console.table(vehiclesIDsToDelete);

  await deleteVehiclesBy({
    vehiclesDB,
    vehiclesIDsToDelete,
  });
  console.info('[ ZOMBOB ] Vehicles IDs deleted');
};

main().then(console.info).catch(console.warn);
