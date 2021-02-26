import Gameboard from './gameboardFactory';
import Player from './playerFactory';
import gameboardRender from './gameboardRender';
import Drag from './drag';
import { elements } from './elements';

const Game = () => {
  const playerOne = Player('human');
  const playerTwo = Player('computer');

  const playerOneBoard = Gameboard();
  const playerTwoBoard = Gameboard();

  const drag = Drag(playerOne, playerOneBoard);

  const renderBothGrids = () => {
    gameboardRender.renderGrid(elements.playerOneGrid, playerOneBoard, playerOne.getType());
    gameboardRender.renderGrid(elements.playerTwoGrid, playerTwoBoard, playerTwo.getType());
  };

  const renderPlayerOneFleet = () => {
    gameboardRender.renderFleet(playerOne.getFleet());
    drag.addDragAndDropEventListeners();
    addRotateEventListeners();
  };

  const addRotateEventListeners = () => {
    const ships = document.querySelectorAll('.ship');
    ships.forEach((ship) => {
      ship.addEventListener('dblclick', (e) => {
        const shipElement = e.target.parentElement;
        const ship = playerOne.getFleet()[shipElement.dataset.ship];
        ship.changeDirection();
        shipElement.classList.toggle('vertical');
        shipElement.firstChild.classList.toggle('horizontal-head');
        shipElement.firstChild.classList.toggle('vertical-head');
        shipElement.lastChild.classList.toggle('horizontal-tail');
        shipElement.lastChild.classList.toggle('vertical-tail');
      });
    });
  };

  const addGridEventListeners = () => {
    elements.playerTwoGrid.addEventListener('click', ctrlAttack);
  };

  const ctrlAttack = (e) => {
    const cell = e.target;
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
      gameboardRender.gameOver();
    };
  };

  const autoPlace = () => {
    playerOneBoard.autoPlaceFleet(playerOne.getFleet());
    //playerTwoBoard.autoPlaceFleet(playerTwo.getFleet());
    renderBothGrids();
    gameboardRender.autoPlace();
  };

  const startGame = () => {
    addGridEventListeners();
    if (playerTwo.getType() === 'computer') playerTwoBoard.autoPlaceFleet(playerTwo.getFleet());
    gameboardRender.startGame();
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
    gameboardRender.playAgain();
  }

  return { renderBothGrids, renderPlayerOneFleet, autoPlace, startGame, playAgain };
}

export default Game;