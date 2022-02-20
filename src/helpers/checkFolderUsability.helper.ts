import {
  access, stat,
} from 'fs/promises';
import { F_OK } from 'constants';

const checkResourceUsability = async (resourcePath: string, type: 'folder' | 'file' = 'folder') => {
  try {
    const stats = await stat(resourcePath);
    const statsCheck = type === 'folder'
      ? !stats.isDirectory()
      : !stats.isFile();
    if (statsCheck) throw new Error('Missing');
  } catch (error) {
    return 'MISSING';
  }

  try {
    await access(resourcePath, F_OK);
    return 'USABLE';
  } catch (error) {
    return 'PERMISSIONS';
  }
};

export default checkResourceUsability;
