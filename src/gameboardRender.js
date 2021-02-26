import { elements } from "./elements";

const gameboardRender = (() => {
  const renderCell = (y, x, status) => {
    return `<div class='grid-cell cell-${y}-${x} ${status}' data-y='${y}' data-x='${x}'></div>`;
  };

  const renderGrid = (parent, gameboard, type) => {
    parent.textContent = '';
    const board = gameboard.getBoard();
    const length = board.length;
    let grid = '';
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        let boardStatus = board[i][j];
        let status = '';
        let direction = '';
        if (boardStatus === null) {
          status = '';
        } else if (boardStatus.ship) {
          if (type === 'human' || type === 'computer') {
            if (boardStatus.ship.getDirection() === 'horizontal') direction = ' horizontal';
            if (boardStatus.ship.getDirection() === 'vertical') direction = ' vertical';
            if (boardStatus.index === 0) {
              status = boardStatus.ship.id + direction + ' head';
            } else if (boardStatus.index === boardStatus.ship.length - 1) { 
              status = boardStatus.ship.id + direction + ' tail';
            } else {
              status = boardStatus.ship.id + direction;
            }
          } else {
            status = '';
          };
        };
        grid += renderCell(i, j, status);
      };
    };
    parent.insertAdjacentHTML('afterbegin', grid);
  };

  const fleetContainer = document.querySelector('.fleet-container');

  const renderFleet = (fleet) => {
    for (const ship in fleet) {
      const container = document.createElement('div');
      container.classList.add('ship', `${fleet[ship].id}-container`);
      container.setAttribute('draggable', true);
      container.dataset.ship = `${fleet[ship].id}`;

      let divs = '';
      let position = 'body';
      for (let i = 0; i < fleet[ship].length; i++) {
        position = 'body'
        if (i === 0) position = 'horizontal-head';
        if (i === fleet[ship].length - 1) position = 'horizontal-tail';
        divs += `<div class='${fleet[ship].id + ' ' + position}' data-index='${i}'></div>`;
      };
      container.insertAdjacentHTML('afterbegin', divs);
      fleetContainer.prepend(container);
    };
  };

  const autoPlace = () => {
    elements.startGameBtn.classList.toggle('hidden');
    //elements.startGameBtn.classList.add('show');
    elements.autoPlaceBtn.classList.toggle('hidden');

    //make this cleaner
    let shipNotPlace = elements.fleetContainer.children.length;
    for (let i = 0; i < shipNotPlace; i++) {
      console.log(elements.fleetContainer.children[i])
      elements.fleetContainer.removeChild(elements.fleetContainer.firstChild)
    };
  };

  const areAllShipsPlaced = () => {
    elements.startGameBtn.classList.toggle('hidden');
    elements.autoPlaceBtn.classList.add('hidden');
  };

  const startGame = () => {
    elements.fleetContainer.classList.toggle('hidden');
    elements.playerTwoBoard.classList.toggle('hidden');
    elements.startGameBtn.classList.toggle('hidden');
  };

  const playAgain = () => {
    elements.fleetContainer.classList.toggle('hidden');
    elements.playAgainBtn.classList.toggle('hidden');
    elements.autoPlaceBtn.classList.toggle('hidden');
    elements.playerTwoBoard.classList.toggle('hidden');
  };

  const gameOver = () => {
    elements.playAgainBtn.classList.toggle('hidden');
  };

  return { renderGrid, renderFleet, autoPlace, areAllShipsPlaced, startGame, playAgain, gameOver };
})();

export default gameboardRender;