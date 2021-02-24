import { SHIP_LENGTHS } from './setupShips';

const Ship = (type) => {
  const id = type;
  const length = SHIP_LENGTHS[type];
  let direction = 'horizontal';

  const getDirection = () => direction;
  const changeDirection = () => direction === 'horizontal' ? direction = 'vertical' : direction = 'horizontal';

  const hits = Array(length).fill(null);
  const hit = (spot) => hits[spot] = 'hit';
  const getHits = () => hits;

  const isSunk = () => hits.every((spot) => spot === 'hit');

  return { id, length, hit, getHits, isSunk, getDirection, changeDirection };
};

export default Ship;