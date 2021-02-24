import { SHIP_TYPES } from '../src/setupShips';

const Gameboard = () => {
  let board = Array(10).fill(null).map(() => Array(10).fill(null));
  const getBoard = () => board;

  let placedShips = [];
  const areAllShipsPlaced = () => placedShips.length === SHIP_TYPES.length;

  const adjustCoords = (y0, x0, i, direction) => {
    let x = x0 + i;
    let y = y0;
    if (direction === 'vertical') {
      x = x0;
      y = y0 + i;
    };
    return [y, x];
  };

  const checkValidity = (y0, x0, length, direction) => {
    const cells = [];
    for (let i = 0; i < length; i++) {
      const [y, x] = adjustCoords(y0, x0, i, direction);
      if (y < 10 && x < 10) {
        cells.push(board[y][x]);
      } else {
        return false;
      };
    };
    return cells.every((cell) => cell === null);
  };

  const placeShip = (ship, y0, x0) => {
    const direction = ship.getDirection();
    const validity = checkValidity(y0, x0, ship.length, direction);
    if (validity) {
      for (let i = 0; i < ship.length; i++) {
        const [y, x] = adjustCoords(y0, x0, i, direction);
        board[y][x] = { ship, index: i };
      };
      placedShips.push(ship);
      return validity;
    } else {
      return validity
    };
  };

  const receiveAttack = (y0, x0) => {
    if (board[y0][x0] === null) {
      board[y0][x0] = 'miss';
    } else {
      let struckShip = board[y0][x0];
      struckShip.ship.hit(struckShip.index);
      board[y0][x0] = 'hit';
    };
    return board[y0][x0];
  };

  const randomCoords = () => {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    return [y, x];
  };

  const autoPlaceShip = (ship) => {
    const [y, x] = randomCoords();
    const reOrientShip = Math.random() > 0.5;
    if (reOrientShip) ship.changeDirection();
    const placedShip = placeShip(ship, y, x);
    if (!placedShip) autoPlaceShip(ship);
  };

  const autoPlaceFleet = (fleet) => {
    for (const ship in fleet) {
      autoPlaceShip(fleet[ship]);
    };
  };

  const resetBoard = () => {
    board = Array(10).fill(null).map(() => Array(10).fill(null));
    placedShips = [];
  };

  const areAllShipsSunk = () => placedShips.every((ship) => ship.isSunk());

  return { getBoard, placeShip, areAllShipsPlaced, receiveAttack, areAllShipsSunk, autoPlaceFleet, resetBoard };
};

export default Gameboard;