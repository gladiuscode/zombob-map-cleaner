import getUserInput from '../../helpers/getUserInput.helper';
import paths from '../../config/paths';
import { readdir } from 'fs/promises';

const getValidSaveToCleanUp = async (saves: string[]): Promise<string> => {
  const chosenSaveIndex = await getUserInput('Please choose save index to cleanup: ');
  if (!chosenSaveIndex.length) {
    console.warn('Please choose saves index');
    return await getValidSaveToCleanUp(saves);
  }

  const possibleIndex = Number(chosenSaveIndex);
  const outsideRange = possibleIndex < 0 || possibleIndex >= saves.length;
  if (outsideRange) {
    console.warn('Please choose valid saves index');
    return await getValidSaveToCleanUp(saves);
  }

  const possibleSave = saves[possibleIndex];
  if (!possibleSave) {
    console.warn('Can\'t find save, please provide another index');
    return await getValidSaveToCleanUp(saves);
  }

  return possibleSave;
};

const chooseServerSave = async () => {
  const saves = await readdir(paths.SAVES_DATA_FOLDER_PATH);
  console.info('Saves');
  console.table(saves);
  return getValidSaveToCleanUp(saves);
};

export default chooseServerSave;
