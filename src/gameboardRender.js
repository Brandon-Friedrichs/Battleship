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
        let status = board[i][j];
        if (status === null) {
          status = '';
        } else if (status.ship) {
          if (type === 'human' || type === 'computer') {
            status = status.ship.id;
          } else {
            status = '';
          };
        };
        grid += renderCell(i, j, status);
      }
    }
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
      for (let i = 0; i < fleet[ship].length; i++) {
        divs += `<div class=${fleet[ship].id} data-index='${i}'></div>`;
      };
      container.insertAdjacentHTML('afterbegin', divs);
      fleetContainer.prepend(container);
    };
  };

  const autoPlace = () => {
    elements.startGameBtn.classList.toggle('hidden');
    //elements.startGameBtn.classList.add('show');
    elements.autoPlaceBtn.classList.toggle('hidden');
  };

  const startGame = () => {
    elements.startGameBtn.classList.toggle('hidden');
    elements.autoPlaceBtn.classList.add('hidden');
    //make this cleaner
    let shipNotPlace = elements.fleetContainer.children.length;
    for (let i = 0; i < shipNotPlace; i++) {
      console.log(elements.fleetContainer.children[i])
      elements.fleetContainer.removeChild(elements.fleetContainer.firstChild)
    }
  };

  const playAgain = () => {
    elements.playAgainBtn.classList.toggle('hidden');
    elements.autoPlaceBtn.classList.toggle('hidden');
  };

  const gameOver = () => {
    elements.playAgainBtn.classList.toggle('hidden');
  };

  return { renderGrid, renderFleet, autoPlace, startGame, playAgain, gameOver };
})();

export default gameboardRender;