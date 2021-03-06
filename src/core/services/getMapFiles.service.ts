import { getServerSavePath } from '../../config/paths';
import { readdir } from 'fs/promises';

const getMapFiles = async () => {
  const savesFiles = await readdir(getServerSavePath());
  const mapFiles = savesFiles.filter(file => file.startsWith('map') && file.match(/([0-9]+)/g) && file.endsWith('.bin'));
  if (!mapFiles.length) {
    throw new Error('Missing saves to clean up');
  }
  return mapFiles;
};

export default getMapFiles;
