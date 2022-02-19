import DatabaseService from './database/database.service';
import deleteMapFiles from './core/services/deleteMapFiles.service';
import getCoordsToPurgeFrom from './core/services/getCoordsToPurgeFrom.service';
import getFileContent from './helpers/getFileContent.helper';
import getMapFiles from './core/services/getMapFiles.service';
import getMapFilesToDelete from './core/services/getMapFilesToDelete.service';
import getVehiclesIDsToDelete from './core/services/getVehiclesIdToDelete.service';
import path from 'path';
import paths from './config/paths';

const main = async () => {
  console.info('[ ZOMBOB ] Map cleaner started');

  const mapFiles = await getMapFiles();
  console.info('[ ZOMBOB ] Map files');
  console.table(mapFiles);

  const rawCoordsToPurge = await getFileContent(paths.COORDS_TO_PURGE_FILE_PATH);
  const coordsToPurge = rawCoordsToPurge.map(rawCoords => getCoordsToPurgeFrom(rawCoords));
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

  const vehiclesDBPath = path.join( paths.SAVES_DATA_FOLDER_PATH, 'vehicles.db' );
  const vehiclesDB = new DatabaseService(vehiclesDBPath);
  console.info('[ ZOMBOB ] Vehicles DB loaded');

  const vehiclesIDsToDelete = await getVehiclesIDsToDelete({
    vehiclesDB,
    coordsToPurge,
  });
  console.info('[ ZOMBOB ] Vehicles IDs to delete');
  console.table(vehiclesIDsToDelete);
};

main().then(console.info).catch(console.warn);
