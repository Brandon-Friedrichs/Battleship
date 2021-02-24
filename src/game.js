import Gameboard from './gameboardFactory';
import Player from './playerFactory';
import gameboardRender from './gameboardRender';
import { elements } from './elements';

const Game = () => {
  const playerOne = Player('human');
  const playerTwo = Player('computer');

  const playerOneBoard = Gameboard();
  const playerTwoBoard = Gameboard();

  const renderBothGrids = () => {
    gameboardRender.renderGrid(elements.playerOneGrid, playerOneBoard, playerOne.getType());
    gameboardRender.renderGrid(elements.playerTwoGrid, playerTwoBoard, playerTwo.getType());
  };

  const renderPlayerOneFleet = () => {
    gameboardRender.renderFleet(playerOne.getFleet());
  };

  const addGridEventListeners = () => {
    elements.playerTwoGrid.addEventListener('click', ctrlAttack);
  };

  const ctrlAttack = (e) => {
    const cell = e.target;
    console.log(cell);
    if (cell.classList.contains('grid-cell')) {
      const y = cell.dataset.y;
      const x = cell.dataset.x;
      const boardCell = playerTwoBoard.getBoard()[y][x];
      if (boardCell !== 'miss' && boardCell !== 'hit') {
        playerOne.attack(y, x, playerTwoBoard);
        playerTwo.autoAttack(playerOneBoard);
        renderBothGrids();
      };
    };
    if (playerOneBoard.areAllShipsSunk() || playerTwoBoard.areAllShipsSunk()) {
      let winner = '';
      if (playerOneBoard.areAllShipsSunk()) winner = 'Computer';
      if (playerTwoBoard.areAllShipsSunk()) winner = 'You';
      elements.playerTwoGrid.removeEventListener('click', ctrlAttack);
    };
  };

  const autoPlace = () => {
    playerOneBoard.autoPlaceFleet(playerOne.getFleet());
    playerTwoBoard.autoPlaceFleet(playerTwo.getFleet());
    renderBothGrids();
  };

  const startGame = () => {
    addGridEventListeners();
  };

  const resetGame = () => {
    playerOne.resetFleet();
    playerTwo.resetFleet();
    playerOneBoard.resetBoard();
    playerTwoBoard.resetBoard();
  };

  const playAgain = () => {
    resetGame();
    renderBothGrids();
    renderPlayerOneFleet();
    console.log(playerOneBoard.getBoard())
  }

  return { renderBothGrids, renderPlayerOneFleet, autoPlace, startGame, playAgain };
}

export default Game;