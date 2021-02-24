import Gameboard from '../gameboardFactory';
import Ship from '../shipFactory';

describe('Gameboard', () => {
  describe('board', () => {
    const gameboard = Gameboard();

    test('empty board', () => {
      const actual = gameboard.getBoard().every((cell) => cell === null);
      expect(actual).toBe(false);
    });
    test('board row contains 10 cells', () => {
      const actual = gameboard.getBoard().length;
      expect(actual).toBe(10);
    });
    test('board column contains 10 cells', () => {
      const actual = gameboard.getBoard()[0].length;
      expect(actual).toBe(10);
    });
  });

  describe('place horizontal ship', () => {
    const gameboard = Gameboard();
    const ship = Ship('cruiser');
    gameboard.placeShip(ship, 3, 2);

    test('placed ship at starter coords with index 0', () => {
      const actual = gameboard.getBoard()[3][2];
      expect(actual).toEqual({ ship, index: 0});
    });
    test('placed ship at coords with index 1', () => {
      const actual = gameboard.getBoard()[3][3];
      expect(actual).toEqual({ ship, index: 1});
    });
    test('placed ship at final coords with index 2', () => {
      const actual = gameboard.getBoard()[3][4];
      expect(actual).toEqual({ ship, index: 2});
    });
  });

  describe('place vertical ship', () => {
    const gameboard = Gameboard();
    const ship = Ship('submarine');
    ship.changeDirection();
    gameboard.placeShip(ship, 3, 2);

    test('placed ship at starter coords with index 0', () => {
      const actual = gameboard.getBoard()[3][2];
      expect(actual).toEqual({ ship, index: 0});
    });
    test('placed ship at coords with index 1', () => {
      const actual = gameboard.getBoard()[4][2];
      expect(actual).toEqual({ ship, index: 1});
    });
    test('placed ship at final coords with index 2', () => {
      const actual = gameboard.getBoard()[5][2];
      expect(actual).toEqual({ ship, index: 2});
    });
  });

  describe('reject placement when coords are off board', () => {
    const gameboard = Gameboard();
    const ship = Ship('carrier');

    test('out-of-bounds placement horizontal ship', () => {
      gameboard.placeShip(ship, 7, 7); // [7,7],[7,8],[7,9],[7,10],[7,11]
      const actual = gameboard.getBoard()[7][7];
      expect(actual).toEqual(null);
    });
    test('out-of-bounds placement vertical ship', () => {
      ship.changeDirection();
      gameboard.placeShip(ship, 7, 7); // [7,7],[8,7],[9,7],[10,7],[11,7]
      const actual = gameboard.getBoard()[7][7];
      expect(actual).toEqual(null);
    });
  });

  describe('reject placement when coords are collision with other ship', () => {
    const gameboard = Gameboard();
    const ship = Ship('carrier');
    const secondShip = Ship('battleship');

    test('collision with ship already placed', () => {
      gameboard.placeShip(ship, 2, 0); // [2,0],[2,1],[2,2],[2,3],[2,4]
      gameboard.placeShip(secondShip, 2, 0); // [2,0],[2,1],[2,2],[2,3]
      const actual = gameboard.getBoard()[2][0];
      expect(actual).toEqual({ ship: ship, index: 0 });
    });
    test('collision with ship already placed', () => {
      secondShip.changeDirection();
      gameboard.placeShip(secondShip, 0, 2); // [0,2],[1,2],[2,2],[3,2]
      const actual = gameboard.getBoard()[0][2];
      expect(actual).toEqual(null);
    });
  });

  describe('are all ships placed', () => {
    const gameboard = Gameboard();
    const carrier = Ship('carrier');
    const battleship = Ship('battleship');
    const cruiser = Ship('cruiser');
    const submarine = Ship('submarine');
    const destroyer = Ship('destroyer');

    test('no ships placed', () => {
      const actual = gameboard.areAllShipsPlaced();
      expect(actual).toBe(false);
    });
    test('some ships placed', () => {
      gameboard.placeShip(carrier, 0, 0);
      gameboard.placeShip(battleship, 1, 0);
      const actual = gameboard.areAllShipsPlaced();
      expect(actual).toBe(false);
    });
    test('all ships placed', () => {
      gameboard.placeShip(cruiser, 2, 0);
      gameboard.placeShip(submarine, 3, 0);
      gameboard.placeShip(destroyer, 4, 0);
      const actual = gameboard.areAllShipsPlaced();
      expect(actual).toBe(true);
    });
  });

  describe('receiveAttack', () => {
    const gameboard = Gameboard();
    const carrier = Ship('carrier');
    const battleship = Ship('battleship');
    gameboard.placeShip(carrier, 2, 0); // [2,0],[2,1],[2,2],[2,3],[2,4]
    battleship.changeDirection();
    gameboard.placeShip(battleship, 3, 2); // [3,2],[4,2],[5,2],[6,2]
    gameboard.receiveAttack(0,0);

    test('attack carrier at index 0', () => {
      gameboard.receiveAttack(2, 0);
      const actual = carrier.getHits();
      expect(actual).toEqual(['hit', null, null, null, null]);
    });
    test('attack carrier at index 3', () => {
      gameboard.receiveAttack(2, 3);
      const actual = carrier.getHits();
      expect(actual).toEqual(['hit', null, null, 'hit', null]);
    });
    test('attack misses ship', () => {
      const actual = gameboard.getBoard()[0][0];
      expect(actual).toEqual('miss');
    });
    test('hit ship at cords (2,0)', () => {
      const actual = gameboard.getBoard()[2][0];
      expect(actual).toEqual('hit');
    });
    test('hit ship at cords (2,3)', () => {
      const actual = gameboard.getBoard()[2][3];
      expect(actual).toEqual('hit');
    });
  });

  describe('are all ships sunk', () => {
    const gameboard = Gameboard();
    const submarine = Ship('submarine');
    const destroyer = Ship('destroyer');
    gameboard.placeShip(submarine, 2, 0);
    destroyer.changeDirection();
    gameboard.placeShip(destroyer, 3, 2);

    test('no ships sunk', () => {
      const actual = gameboard.areAllShipsSunk();
      expect(actual).toEqual(false);
    });
    test('1 ship has sunk', () => {
      gameboard.receiveAttack(2, 0);
      gameboard.receiveAttack(2, 1);
      gameboard.receiveAttack(2, 2);
      const actual = gameboard.areAllShipsSunk();
      expect(actual).toEqual(false);
    });
    test('all ships have sunk', () => {
      gameboard.receiveAttack(3, 2);
      gameboard.receiveAttack(4, 2);
      const actual = gameboard.areAllShipsSunk();
      expect(actual).toEqual(true);
    });
  });


});