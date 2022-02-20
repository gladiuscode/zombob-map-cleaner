import {
  mkdir, writeFile,
} from 'fs/promises';
import checkResourceUsability from '../../helpers/checkFolderUsability.helper';
import getFileContent from '../../helpers/getFileContent.helper';
import paths from '../../config/paths';

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
  if (coordsToPurgeFileUsable === 'MISSING') {
    await writeFile(paths.COORDS_TO_PURGE_FILE_PATH, 'DELETE THIS: Example: start_1302_1234-end_1234_1235');
    return false;
  }

  const coordsToPurgeContent = await getFileContent(paths.COORDS_TO_PURGE_FILE_PATH);
  if (!coordsToPurgeContent.length || !coordsToPurgeContent[0]?.length) return false;

  const hasExample = coordsToPurgeContent.some(content => content.includes('DELETE'));
  return !hasExample;
};

export default initializeRequirements;
