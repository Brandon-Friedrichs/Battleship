import Player from '../playerFactory';
import Gameboard from '../gameboardFactory';

const humanPlayer = Player('human');
const computerPlayer = Player('computer');
const humanBoard = Gameboard();
const computerBoard = Gameboard();

describe('player type', () => {
  test('human type player', () => {
    const actual = humanPlayer.getType();
    expect(actual).toBe('human');
  });
  test('computer type player', () => {
    const actual = computerPlayer.getType();
    expect(actual).toBe('computer');
  });
});

describe('human player attacking computer board', () => {
  test('attack computer board', () => {
    humanPlayer.attack(2, 3, computerBoard);
    const actual = computerBoard.getBoard()[2][3];
    expect(actual).toBe('miss');
  });
});

describe('computer player attacks human board', () => {
  test('attack human board', () => {
    computerPlayer.autoAttack(humanBoard);
    const actual = humanBoard.getBoard().flat().every((cell) => cell === null);
    expect(actual).toBe(false);
  });
});