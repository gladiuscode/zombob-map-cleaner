import { IGetMapFilesToDeleteParams } from '../types/shared';

const getMapFilesToDelete = ({
  mapFiles, coordsToPurge,
}: IGetMapFilesToDeleteParams) => {

  const toDeleteByCoordsToPurge = coordsToPurge.map(coords => {
    const {
      start, end,
    } = coords;

    const toDelete = mapFiles.filter(mapFile => {
      const mapFileCoords = mapFile.match(/([0-9]+)/g);
      if (!mapFileCoords) return false;

      const [
        x, y,
      ] = mapFileCoords;
      if (!x || !y) return false;

      const insideXRange = x >= start.x && x <= end.x;
      const insideYRange = y <= start.y && y >= end.y;
      return insideXRange && insideYRange;
    });

    return {
      coords,
      toDelete,
    };
  });

  return toDeleteByCoordsToPurge.reduce((accFiles, files) => [
    ...accFiles, ...files.toDelete,
  ], [] as string[]);
};

export default getMapFilesToDelete;
