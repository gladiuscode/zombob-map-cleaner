import { ICoordsToPurge } from '../types/shared';

const getCoordsToPurgeFrom = (coords: string): ICoordsToPurge => {
  const [
    rawStartingCoords, rawEndingCoords,
  ] = coords.split('-');
  if (!rawStartingCoords || !rawEndingCoords) {
    throw new Error('Wrong coords configuration. Please fix it.');
  }

  const findCoords = /([0-9]+)/g;

  const startingCoords = rawStartingCoords.match(findCoords);
  const endingCoords = rawEndingCoords.match(findCoords);
  if (!startingCoords || !endingCoords) {
    throw new Error('Missing starting and/or ending coords. Please fix it.');
  }

  const [
    startingX, startingY,
  ] = startingCoords;
  const missingStartingCoords = !startingX || !startingY;

  const [
    endingX, endingY,
  ] = endingCoords;
  const missingEndingCoords = !endingX || !endingY;

  if (missingStartingCoords || missingEndingCoords) {
    throw new Error('Missing starting point and/or ending point. Please fix it.');
  }

  const start: ICoordsToPurge['start'] = {
    x: startingX!,
    y: startingY!,
  };
  const end: ICoordsToPurge['end'] = {
    x: endingX!,
    y: endingY!,
  };

  return {
    start,
    end,
  };
};

export default getCoordsToPurgeFrom;
