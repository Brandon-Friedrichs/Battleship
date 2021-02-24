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

  const renderFleet = (fleet) => {
    for (const ship in fleet) {
      const container = document.createElement('div');
      container.classList.add('ship', `${fleet[ship].id}-container`);
      container.dataset.ship = `${fleet[ship].id}`;

      let divs = '';
      for (let i = 0; i < fleet[ship].length; i++) {
        divs += `<div class=${fleet[ship].id} data-index='${i}'></div>`;
      };
      container.insertAdjacentHTML('afterbegin', divs);
    };
  };

  return { renderGrid, renderFleet };
})();

export default gameboardRender;