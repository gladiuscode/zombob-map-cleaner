import path from 'path';
import paths from '../../config/paths';
import { unlink } from 'fs/promises';

const deleteMapFiles = async (files: string[]) => {
  const deletePromises = files.map(async file => {
    const filePath = path.join( paths.SAVES_DATA_FOLDER_PATH, file );
    await unlink(filePath);
  });
  await Promise.all(deletePromises);
};

export default deleteMapFiles;
