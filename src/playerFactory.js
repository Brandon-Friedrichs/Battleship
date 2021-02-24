import { SHIP_TYPES, createFleet } from './setupShips';

const Player = (type) => {
  let fleet = createFleet(SHIP_TYPES);

  const getType = () => type;
  const getFleet = () => fleet;

  const attack = (y, x, enemyBoard) => enemyBoard.receiveAttack(y, x);

  const autoAttack = (enemyBoard) => {
    const [y, x] = randomCoords();
    const cell = enemyBoard.getBoard()[y][x];
    if (cell === 'miss' || cell === 'hit') {
      autoAttack(enemyBoard);
    } else {
      enemyBoard.receiveAttack(y, x);
    };
  };

  const randomCoords = () => {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    return [y, x];
  };

  const resetFleet = () => (fleet = createFleet(SHIP_TYPES));

  return { getType, getFleet, attack, autoAttack, resetFleet };
};

export default Player;