import getCoordsToPurgeFrom from './core/services/getCoordsToPurgeFrom.service';
import getFileContent from './helpers/getFileContent.helper';
import paths from './config/paths';

const main = async () => {
  console.info('[ ZOMBOB ] Map cleaner started');

  const rawCoordsToPurge = await getFileContent(paths.COORDS_TO_PURGE_FILE_PATH);

  const coordsToPurge = rawCoordsToPurge.map(rawCoords => getCoordsToPurgeFrom(rawCoords));
  console.info('[ ZOMBOB ] Coords to purge');
  console.table(coordsToPurge);
};

main().then(console.info).catch(console.warn);
