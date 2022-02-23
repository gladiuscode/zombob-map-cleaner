import {
  mkdir, rename, writeFile,
} from 'fs/promises';
import checkResourceUsability from '../../helpers/checkFolderUsability.helper';
import { defaultCitiesCoords } from '../../config/defaultCitiesCoords';
import paths from '../../config/paths';
import { v4 } from 'uuid';

const getCommentedDefaultCoords = (
  citiesCoords: typeof defaultCitiesCoords.vanilla | typeof defaultCitiesCoords.modded,
) => {
  const citiesNames = Object.keys(citiesCoords) as Array<keyof typeof citiesCoords>;
  return citiesNames.map(cityName => {
    const {
      start, end,
    } = citiesCoords[cityName];
    const coordsToPurge = `start_${start}-end_${end}`;
    return `# ${cityName}\n# ${coordsToPurge}\n`;
  }).join('\n');
};

const initializeCoordsToPurgeFile = async (createBackup: boolean) => {
  if (createBackup) {
    const uniqueId = v4();
    const backupPath = `${paths.COORDS_TO_PURGE_FILE_PATH}-${uniqueId}`;
    await rename(paths.COORDS_TO_PURGE_FILE_PATH, backupPath);
  }

  const {
    vanilla, modded,
  } = defaultCitiesCoords;

  const vanillaCitiesCoords = getCommentedDefaultCoords(vanilla);
  const moddedCitiesCoords = getCommentedDefaultCoords(modded);

  const tutorial = '# Uncomment out only coords that you wanna reset and cleanup (Leave cities commented please). You can add your own too.';

  const data = `${tutorial}\n${vanillaCitiesCoords}\n${moddedCitiesCoords}`;
  await writeFile(paths.COORDS_TO_PURGE_FILE_PATH, data);
};

const initializeRequirements = async () => {

  const zombobDataFolderUsable = await checkResourceUsability(paths.ZOMBOB_DATA_FOLDER_PATH);
  if (zombobDataFolderUsable === 'PERMISSIONS') {
    throw new Error('Missing permissions to access folder');
  }
  if (zombobDataFolderUsable === 'MISSING') {
    await mkdir(paths.ZOMBOB_DATA_FOLDER_PATH);
  }

  const mapCleanerFolderUsable = await checkResourceUsability(paths.MAP_CLEANER_FOLDER_PATH);
  if (mapCleanerFolderUsable === 'PERMISSIONS') {
    throw new Error('Missing permissions to access folder');
  }
  if (mapCleanerFolderUsable === 'MISSING') {
    await mkdir(paths.MAP_CLEANER_FOLDER_PATH);
  }

  const coordsToPurgeFileUsable = await checkResourceUsability(paths.COORDS_TO_PURGE_FILE_PATH, 'file');
  if (coordsToPurgeFileUsable === 'PERMISSIONS') {
    throw new Error('Missing permissions to access file');
  }

  const createBackup = coordsToPurgeFileUsable === 'USABLE';
  await initializeCoordsToPurgeFile(createBackup);
  return true;
};

export default initializeRequirements;
