import { homedir } from 'os';
import path from 'path';

const ZOMBOB_DATA_FOLDER_PATH = path.join( homedir(), 'zombob-data' );
const MAP_CLEANER_FOLDER_PATH = path.join( ZOMBOB_DATA_FOLDER_PATH, 'map-cleaner' );
const COORDS_TO_PURGE_FILE_PATH = path.join( MAP_CLEANER_FOLDER_PATH, 'coords_to_purge.txt' );

const paths = {
  ZOMBOB_DATA_FOLDER_PATH,
  MAP_CLEANER_FOLDER_PATH,
  COORDS_TO_PURGE_FILE_PATH,
};

export default paths;
