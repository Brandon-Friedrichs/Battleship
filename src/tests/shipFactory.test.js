import Ship from '../shipFactory';

describe('Ship Factory', () => {
  describe('properties', () => {
    const ship = Ship('battleship');
    
    test('get id', () => {
      expect(ship.id).toBe('battleship');
    });
    test('get length', () => {
      expect(ship.length).toBe(4);
    });
    test('get direction', () => {
      expect(ship.getDirection()).toBe('horizontal');
    });
    test('change direction', () => {
      ship.changeDirection();
      expect(ship.getDirection()).toBe('vertical');
    });
  });

  describe('hit function', () => {
    const ship = Ship('submarine');
    test('undamaged ship', () => {
      expect(ship.getHits()).toEqual([null, null, null]);
    });
    test('damaged ship', () => {
      ship.hit(1);
      expect(ship.getHits()).toEqual([null, 'hit', null]);
    });
  });

  describe('isSunk function', () => {
    const ship = Ship('cruiser');
    test('not sunk', () => {
      expect(ship.isSunk()).toBe(false);
    });
    test('hit once but not sunk', () => {
      ship.hit(0);
      expect(ship.isSunk()).toBe(false);
    });
    test('sunk', () => {
      ship.hit(1);
      ship.hit(2)
      expect(ship.isSunk()).toBe(true);
    });
  });

});