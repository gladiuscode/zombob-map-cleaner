import { IGetMapFilesToDeleteParams } from '../types/shared';

const getMapFilesToDelete = ({
  mapFiles, coordsToPurge,
}: IGetMapFilesToDeleteParams) => {

  const toDeleteByCoordsToPurge = coordsToPurge.map(coords => {
    const {
      start, end,
    } = coords;

    const startX = Number(start.x);
    const startY = Number(start.y);
    const endX = Number(end.x);
    const endY = Number(end.y);

    const toDelete = mapFiles.filter(mapFile => {
      const mapFileCoords = mapFile.match(/([0-9]+)/g);
      if (!mapFileCoords) return false;

      const [
        rawX, rawY,
      ] = mapFileCoords;
      if (!rawX || !rawY) return false;

      const mapX = Number(rawX);
      const mapY = Number(rawY);

      const insideXRange = mapX >= startX && mapX <= endX;
      const insideYRange = mapY >= startY && mapY <= endY;
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
