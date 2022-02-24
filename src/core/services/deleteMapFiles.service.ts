import { getServerSavePath } from '../../config/paths';
import path from 'path';
import { unlink } from 'fs/promises';

const deleteMapFiles = async (files: string[]) => {
  const deletePromises = files.map(async file => {
    const filePath = path.join( getServerSavePath(), file );
    await unlink(filePath);
  });
  await Promise.all(deletePromises);
};

export default deleteMapFiles;
