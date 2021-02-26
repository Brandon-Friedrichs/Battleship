import { elements } from './elements';
import gameboardRender from './gameboardRender';

const Drag = (playerOne, playerOneBoard) => {
  let draggedShip;
  let draggedShipIndex;

  const dragStart = (e) => {
    draggedShip = e.target;
  };

  const getDraggedShipIndex = (e) => {
    (draggedShipIndex = Number(e.target.dataset.index));
  };

  const dragDrop = (e) => {
    const cell = e.target;
    console.log(e.target);

    const playerOneShip = playerOne.getFleet()[draggedShip.dataset.ship];
    const isHorizontal = playerOneShip.getDirection() === 'horizontal';

    const y = Number(cell.dataset.y) - (isHorizontal ? 0 : draggedShipIndex);
    const x = Number(cell.dataset.x) - (isHorizontal ? draggedShipIndex : 0);

    const result = playerOneBoard.placeShip(playerOneShip, y, x);
    if (result) {
      gameboardRender.renderGrid(elements.playerOneGrid, playerOneBoard, playerOne.getType());
      addDragAndDropEventListeners();
      draggedShip.parentElement.removeChild(draggedShip);
    };
    if (playerOneBoard.areAllShipsPlaced()) {
      gameboardRender.areAllShipsPlaced();
    };
  };

  const dragOver = (e) => e.preventDefault();
  const dragEnter = (e) => e.preventDefault();
  const dragLeave = () => {};
  const dragEnd = () => {};

  const addDragAndDropEventListeners = () => {
    const ships = document.querySelectorAll('.ship');
    const cells = elements.playerOneGrid.childNodes;

    for (const ship of ships) {
      ship.addEventListener('mousedown', getDraggedShipIndex);
      ship.addEventListener('dragstart', dragStart);
      ship.addEventListener('dragend', dragEnd);
    };
    for (const cell of cells) {
      cell.addEventListener('dragover', dragOver);
      cell.addEventListener('dragenter', dragEnter);
      cell.addEventListener('dragleave', dragLeave);
      cell.addEventListener('drop', dragDrop);
    };
  };

  return { addDragAndDropEventListeners };
};

export default Drag;