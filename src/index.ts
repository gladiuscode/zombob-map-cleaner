import getCoordsToPurgeFrom from './core/services/getCoordsToPurgeFrom.service';
import getFileContent from './helpers/getFileContent.helper';
import paths from './config/paths';
import { readdir } from 'fs/promises';

const main = async () => {
  console.info('[ ZOMBOB ] Map cleaner started');

  const mapFiles = await readdir(paths.SAVES_DATA_FOLDER_PATH);
  if (!mapFiles.length) {
    throw new Error('Missing saves to clean up');
  }
  console.info('[ ZOMBOB ] Map files');
  console.table(mapFiles);

  const rawCoordsToPurge = await getFileContent(paths.COORDS_TO_PURGE_FILE_PATH);

  const coordsToPurge = rawCoordsToPurge.map(rawCoords => getCoordsToPurgeFrom(rawCoords));
  console.info('[ ZOMBOB ] Coords to purge');
  console.table(coordsToPurge);

};

main().then(console.info).catch(console.warn);
