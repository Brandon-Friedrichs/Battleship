import Ship from './shipFactory';

export const SHIP_TYPES = [
  'carrier',
  'battleship',
  'cruiser',
  'submarine',
  'destroyer'
];

export const SHIP_LENGTHS = {
  carrier: 5,
  battleship: 4,
  cruiser: 3,
  submarine: 3,
  destroyer: 2
};

export const createFleet = (types) => {
  const fleet = {};
  types.forEach((type) => (fleet[type] = Ship(type)));
  return fleet;
};
