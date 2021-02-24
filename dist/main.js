/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/drag.js":
/*!*********************!*\
  !*** ./src/drag.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _elements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./elements */ \"./src/elements.js\");\n/* harmony import */ var _gameboardRender__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboardRender */ \"./src/gameboardRender.js\");\n\n\n\nconst Drag = (playerOne, playerOneBoard) => {\n  let draggedShip;\n  let draggedShipIndex;\n\n  const dragStart = (e) => {\n    draggedShip = e.target;\n  };\n\n  const getDraggedShipIndex = (e) => {\n    (draggedShipIndex = Number(e.target.dataset.index));\n  };\n\n  const dragDrop = (e) => {\n    const cell = e.target;\n    console.log(e.target)\n\n    const playerOneShip = playerOne.getFleet()[draggedShip.dataset.ship];\n    const isHorizontal = playerOneShip.getDirection() === 'horizontal';\n\n    const y = Number(cell.dataset.y) - (isHorizontal ? 0 : draggedShipIndex);\n    const x = Number(cell.dataset.x) - (isHorizontal ? draggedShipIndex : 0);\n\n    const result = playerOneBoard.placeShip(playerOneShip, y, x);\n    if (result) {\n      _gameboardRender__WEBPACK_IMPORTED_MODULE_1__.default.renderGrid(_elements__WEBPACK_IMPORTED_MODULE_0__.elements.playerOneGrid, playerOneBoard, playerOne.getType());\n      addDragAndDropEventListeners();\n      draggedShip.parentElement.removeChild(draggedShip);\n    };\n    if (playerOneBoard.areAllShipsPlaced()) {\n      _gameboardRender__WEBPACK_IMPORTED_MODULE_1__.default.startGame();\n    }\n  };\n\n  const dragOver = (e) => e.preventDefault();\n  const dragEnter = (e) => e.preventDefault();\n  const dragLeave = () => {};\n  const dragEnd = () => {};\n\n  const addDragAndDropEventListeners = () => {\n    const ships = document.querySelectorAll('.ship');\n    const cells = _elements__WEBPACK_IMPORTED_MODULE_0__.elements.playerOneGrid.childNodes;\n\n    for (const ship of ships) {\n      ship.addEventListener('mousedown', getDraggedShipIndex);\n      ship.addEventListener('dragstart', dragStart);\n      ship.addEventListener('dragend', dragEnd);\n    };\n    for (const cell of cells) {\n      cell.addEventListener('dragover', dragOver);\n      cell.addEventListener('dragenter', dragEnter);\n      cell.addEventListener('dragleave', dragLeave);\n      cell.addEventListener('drop', dragDrop);\n    };\n  };\n\n  return { addDragAndDropEventListeners };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Drag);\n\n//# sourceURL=webpack://battleship/./src/drag.js?");

/***/ }),

/***/ "./src/elements.js":
/*!*************************!*\
  !*** ./src/elements.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"elements\": () => (/* binding */ elements)\n/* harmony export */ });\nconst elements = {\n  playerOneGrid: document.querySelector('.p1-grid'),\n  playerTwoGrid: document.querySelector('.p2-grid'),\n  ships: document.querySelectorAll('.ship'),\n  fleetContainer: document.querySelector('.fleet-container'),\n  autoPlaceBtn: document.querySelector('.auto-place'),\n  startGameBtn: document.querySelector('.start-game'),\n  playAgainBtn: document.querySelector('.play-again'),\n};\n\n//# sourceURL=webpack://battleship/./src/elements.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _gameboardFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboardFactory */ \"./src/gameboardFactory.js\");\n/* harmony import */ var _playerFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./playerFactory */ \"./src/playerFactory.js\");\n/* harmony import */ var _gameboardRender__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gameboardRender */ \"./src/gameboardRender.js\");\n/* harmony import */ var _drag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./drag */ \"./src/drag.js\");\n/* harmony import */ var _elements__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./elements */ \"./src/elements.js\");\n\n\n\n\n\n\nconst Game = () => {\n  const playerOne = (0,_playerFactory__WEBPACK_IMPORTED_MODULE_1__.default)('human');\n  const playerTwo = (0,_playerFactory__WEBPACK_IMPORTED_MODULE_1__.default)('computer');\n\n  const playerOneBoard = (0,_gameboardFactory__WEBPACK_IMPORTED_MODULE_0__.default)();\n  const playerTwoBoard = (0,_gameboardFactory__WEBPACK_IMPORTED_MODULE_0__.default)();\n\n  const drag = (0,_drag__WEBPACK_IMPORTED_MODULE_3__.default)(playerOne, playerOneBoard);\n\n  const renderBothGrids = () => {\n    _gameboardRender__WEBPACK_IMPORTED_MODULE_2__.default.renderGrid(_elements__WEBPACK_IMPORTED_MODULE_4__.elements.playerOneGrid, playerOneBoard, playerOne.getType());\n    _gameboardRender__WEBPACK_IMPORTED_MODULE_2__.default.renderGrid(_elements__WEBPACK_IMPORTED_MODULE_4__.elements.playerTwoGrid, playerTwoBoard, playerTwo.getType());\n  };\n\n  const renderPlayerOneFleet = () => {\n    _gameboardRender__WEBPACK_IMPORTED_MODULE_2__.default.renderFleet(playerOne.getFleet());\n    drag.addDragAndDropEventListeners();\n    addRotateEventListeners();\n  };\n\n  const addRotateEventListeners = () => {\n    const ships = document.querySelectorAll('.ship');\n    ships.forEach((ship) => {\n      ship.addEventListener('dblclick', (e) => {\n        const shipElement = e.target.parentElement;\n        const ship = playerOne.getFleet()[shipElement.dataset.ship];\n        ship.changeDirection();\n        shipElement.classList.toggle('vertical');\n      });\n    });\n  };\n\n  const addGridEventListeners = () => {\n    _elements__WEBPACK_IMPORTED_MODULE_4__.elements.playerTwoGrid.addEventListener('click', ctrlAttack);\n  };\n\n  const ctrlAttack = (e) => {\n    const cell = e.target;\n    if (cell.classList.contains('grid-cell')) {\n      const y = cell.dataset.y;\n      const x = cell.dataset.x;\n      const boardCell = playerTwoBoard.getBoard()[y][x];\n      if (boardCell !== 'miss' && boardCell !== 'hit') {\n        playerOne.attack(y, x, playerTwoBoard);\n        playerTwo.autoAttack(playerOneBoard);\n        renderBothGrids();\n      };\n    };\n    if (playerOneBoard.areAllShipsSunk() || playerTwoBoard.areAllShipsSunk()) {\n      let winner = '';\n      if (playerOneBoard.areAllShipsSunk()) winner = 'Computer';\n      if (playerTwoBoard.areAllShipsSunk()) winner = 'You';\n      _elements__WEBPACK_IMPORTED_MODULE_4__.elements.playerTwoGrid.removeEventListener('click', ctrlAttack);\n      _gameboardRender__WEBPACK_IMPORTED_MODULE_2__.default.gameOver();\n    };\n  };\n\n  const autoPlace = () => {\n    playerOneBoard.autoPlaceFleet(playerOne.getFleet());\n    //playerTwoBoard.autoPlaceFleet(playerTwo.getFleet());\n    renderBothGrids();\n    _gameboardRender__WEBPACK_IMPORTED_MODULE_2__.default.autoPlace();\n  };\n\n  const startGame = () => {\n    addGridEventListeners();\n    if (playerTwo.getType() === 'computer') playerTwoBoard.autoPlaceFleet(playerTwo.getFleet());\n    _gameboardRender__WEBPACK_IMPORTED_MODULE_2__.default.startGame();\n  };\n\n  const resetGame = () => {\n    playerOne.resetFleet();\n    playerTwo.resetFleet();\n    playerOneBoard.resetBoard();\n    playerTwoBoard.resetBoard();\n  };\n\n  const playAgain = () => {\n    resetGame();\n    renderBothGrids();\n    renderPlayerOneFleet();\n    _gameboardRender__WEBPACK_IMPORTED_MODULE_2__.default.playAgain();\n  }\n\n  return { renderBothGrids, renderPlayerOneFleet, autoPlace, startGame, playAgain };\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);\n\n//# sourceURL=webpack://battleship/./src/game.js?");

/***/ }),

/***/ "./src/gameboardFactory.js":
/*!*********************************!*\
  !*** ./src/gameboardFactory.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _src_setupShips__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/setupShips */ \"./src/setupShips.js\");\n\n\nconst Gameboard = () => {\n  let board = Array(10).fill(null).map(() => Array(10).fill(null));\n  const getBoard = () => board;\n\n  let placedShips = [];\n  const areAllShipsPlaced = () => placedShips.length === _src_setupShips__WEBPACK_IMPORTED_MODULE_0__.SHIP_TYPES.length;\n\n  const adjustCoords = (y0, x0, i, direction) => {\n    let x = x0 + i;\n    let y = y0;\n    if (direction === 'vertical') {\n      x = x0;\n      y = y0 + i;\n    };\n    return [y, x];\n  };\n\n  const checkValidity = (y0, x0, length, direction) => {\n    const cells = [];\n    for (let i = 0; i < length; i++) {\n      const [y, x] = adjustCoords(y0, x0, i, direction);\n      if (y < 10 && x < 10) {\n        cells.push(board[y][x]);\n      } else {\n        return false;\n      };\n    };\n    return cells.every((cell) => cell === null);\n  };\n\n  const placeShip = (ship, y0, x0) => {\n    const direction = ship.getDirection();\n    const validity = checkValidity(y0, x0, ship.length, direction);\n    if (validity) {\n      for (let i = 0; i < ship.length; i++) {\n        const [y, x] = adjustCoords(y0, x0, i, direction);\n        board[y][x] = { ship, index: i };\n      };\n      placedShips.push(ship);\n      return validity;\n    } else {\n      return validity\n    };\n  };\n\n  const receiveAttack = (y0, x0) => {\n    if (board[y0][x0] === null) {\n      board[y0][x0] = 'miss';\n    } else {\n      let struckShip = board[y0][x0];\n      struckShip.ship.hit(struckShip.index);\n      board[y0][x0] = 'hit';\n    };\n    return board[y0][x0];\n  };\n\n  const randomCoords = () => {\n    let x = Math.floor(Math.random() * 10);\n    let y = Math.floor(Math.random() * 10);\n    return [y, x];\n  };\n\n  const autoPlaceShip = (ship) => {\n    const [y, x] = randomCoords();\n    const reOrientShip = Math.random() > 0.5;\n    if (reOrientShip) ship.changeDirection();\n    const placedShip = placeShip(ship, y, x);\n    if (!placedShip) autoPlaceShip(ship);\n  };\n\n  const autoPlaceFleet = (fleet) => {\n    for (const ship in fleet) {\n      autoPlaceShip(fleet[ship]);\n    };\n  };\n\n  const resetBoard = () => {\n    board = Array(10).fill(null).map(() => Array(10).fill(null));\n    placedShips = [];\n  };\n\n  const areAllShipsSunk = () => placedShips.every((ship) => ship.isSunk());\n\n  return { getBoard, placeShip, areAllShipsPlaced, receiveAttack, areAllShipsSunk, autoPlaceFleet, resetBoard };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);\n\n//# sourceURL=webpack://battleship/./src/gameboardFactory.js?");

/***/ }),

/***/ "./src/gameboardRender.js":
/*!********************************!*\
  !*** ./src/gameboardRender.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _elements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./elements */ \"./src/elements.js\");\n\n\nconst gameboardRender = (() => {\n  const renderCell = (y, x, status) => {\n    return `<div class='grid-cell cell-${y}-${x} ${status}' data-y='${y}' data-x='${x}'></div>`;\n  };\n\n  const renderGrid = (parent, gameboard, type) => {\n    parent.textContent = '';\n    const board = gameboard.getBoard();\n    const length = board.length;\n    let grid = '';\n    for (let i = 0; i < length; i++) {\n      for (let j = 0; j < length; j++) {\n        let status = board[i][j];\n        if (status === null) {\n          status = '';\n        } else if (status.ship) {\n          if (type === 'human' || type === 'computer') {\n            status = status.ship.id;\n          } else {\n            status = '';\n          };\n        };\n        grid += renderCell(i, j, status);\n      }\n    }\n    parent.insertAdjacentHTML('afterbegin', grid);\n  };\n\n  const fleetContainer = document.querySelector('.fleet-container');\n\n  const renderFleet = (fleet) => {\n    for (const ship in fleet) {\n      const container = document.createElement('div');\n      container.classList.add('ship', `${fleet[ship].id}-container`);\n      container.setAttribute('draggable', true);\n      container.dataset.ship = `${fleet[ship].id}`;\n\n      let divs = '';\n      for (let i = 0; i < fleet[ship].length; i++) {\n        divs += `<div class=${fleet[ship].id} data-index='${i}'></div>`;\n      };\n      container.insertAdjacentHTML('afterbegin', divs);\n      fleetContainer.prepend(container);\n    };\n  };\n\n  const autoPlace = () => {\n    _elements__WEBPACK_IMPORTED_MODULE_0__.elements.startGameBtn.classList.toggle('hidden');\n    //elements.startGameBtn.classList.add('show');\n    _elements__WEBPACK_IMPORTED_MODULE_0__.elements.autoPlaceBtn.classList.toggle('hidden');\n  };\n\n  const startGame = () => {\n    _elements__WEBPACK_IMPORTED_MODULE_0__.elements.startGameBtn.classList.toggle('hidden');\n    _elements__WEBPACK_IMPORTED_MODULE_0__.elements.autoPlaceBtn.classList.add('hidden');\n    //make this cleaner\n    let shipNotPlace = _elements__WEBPACK_IMPORTED_MODULE_0__.elements.fleetContainer.children.length;\n    for (let i = 0; i < shipNotPlace; i++) {\n      console.log(_elements__WEBPACK_IMPORTED_MODULE_0__.elements.fleetContainer.children[i])\n      _elements__WEBPACK_IMPORTED_MODULE_0__.elements.fleetContainer.removeChild(_elements__WEBPACK_IMPORTED_MODULE_0__.elements.fleetContainer.firstChild)\n    }\n  };\n\n  const playAgain = () => {\n    _elements__WEBPACK_IMPORTED_MODULE_0__.elements.playAgainBtn.classList.toggle('hidden');\n    _elements__WEBPACK_IMPORTED_MODULE_0__.elements.autoPlaceBtn.classList.toggle('hidden');\n  };\n\n  const gameOver = () => {\n    _elements__WEBPACK_IMPORTED_MODULE_0__.elements.playAgainBtn.classList.toggle('hidden');\n  };\n\n  return { renderGrid, renderFleet, autoPlace, startGame, playAgain, gameOver };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameboardRender);\n\n//# sourceURL=webpack://battleship/./src/gameboardRender.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n/* harmony import */ var _elements__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./elements */ \"./src/elements.js\");\n\n\n\nconst test = () => {\n  console.log('test');\n};\n\ntest();\n\n\n\n\nlet game = (0,_game__WEBPACK_IMPORTED_MODULE_0__.default)('one')\n\ngame.renderBothGrids();\ngame.renderPlayerOneFleet();\n\n_elements__WEBPACK_IMPORTED_MODULE_1__.elements.startGameBtn.addEventListener('click', () => {\n  game.startGame()\n});\n\n_elements__WEBPACK_IMPORTED_MODULE_1__.elements.playAgainBtn.addEventListener('click', () => {\n  game.playAgain();\n});\n\n_elements__WEBPACK_IMPORTED_MODULE_1__.elements.autoPlaceBtn.addEventListener('click', () => {\n  game.autoPlace();\n});\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/playerFactory.js":
/*!******************************!*\
  !*** ./src/playerFactory.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _setupShips__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setupShips */ \"./src/setupShips.js\");\n\n\nconst Player = (type) => {\n  let fleet = (0,_setupShips__WEBPACK_IMPORTED_MODULE_0__.createFleet)(_setupShips__WEBPACK_IMPORTED_MODULE_0__.SHIP_TYPES);\n\n  const getType = () => type;\n  const getFleet = () => fleet;\n\n  const attack = (y, x, enemyBoard) => enemyBoard.receiveAttack(y, x);\n\n  const autoAttack = (enemyBoard) => {\n    const [y, x] = randomCoords();\n    const cell = enemyBoard.getBoard()[y][x];\n    if (cell === 'miss' || cell === 'hit') {\n      autoAttack(enemyBoard);\n    } else {\n      enemyBoard.receiveAttack(y, x);\n    };\n  };\n\n  const randomCoords = () => {\n    let x = Math.floor(Math.random() * 10);\n    let y = Math.floor(Math.random() * 10);\n    return [y, x];\n  };\n\n  const resetFleet = () => (fleet = (0,_setupShips__WEBPACK_IMPORTED_MODULE_0__.createFleet)(_setupShips__WEBPACK_IMPORTED_MODULE_0__.SHIP_TYPES));\n\n  return { getType, getFleet, attack, autoAttack, resetFleet };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);\n\n//# sourceURL=webpack://battleship/./src/playerFactory.js?");

/***/ }),

/***/ "./src/setupShips.js":
/*!***************************!*\
  !*** ./src/setupShips.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SHIP_TYPES\": () => (/* binding */ SHIP_TYPES),\n/* harmony export */   \"SHIP_LENGTHS\": () => (/* binding */ SHIP_LENGTHS),\n/* harmony export */   \"createFleet\": () => (/* binding */ createFleet)\n/* harmony export */ });\n/* harmony import */ var _shipFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shipFactory */ \"./src/shipFactory.js\");\n\n\nconst SHIP_TYPES = [\n  'carrier',\n  'battleship',\n  'cruiser',\n  'submarine',\n  'destroyer'\n];\n\nconst SHIP_LENGTHS = {\n  carrier: 5,\n  battleship: 4,\n  cruiser: 3,\n  submarine: 3,\n  destroyer: 2\n};\n\nconst createFleet = (types) => {\n  const fleet = {};\n  types.forEach((type) => (fleet[type] = (0,_shipFactory__WEBPACK_IMPORTED_MODULE_0__.default)(type)));\n  return fleet;\n};\n\n\n//# sourceURL=webpack://battleship/./src/setupShips.js?");

/***/ }),

/***/ "./src/shipFactory.js":
/*!****************************!*\
  !*** ./src/shipFactory.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _setupShips__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setupShips */ \"./src/setupShips.js\");\n\n\nconst Ship = (type) => {\n  const id = type;\n  const length = _setupShips__WEBPACK_IMPORTED_MODULE_0__.SHIP_LENGTHS[type];\n  let direction = 'horizontal';\n\n  const getDirection = () => direction;\n  const changeDirection = () => direction === 'horizontal' ? direction = 'vertical' : direction = 'horizontal';\n\n  const hits = Array(length).fill(null);\n  const hit = (spot) => hits[spot] = 'hit';\n  const getHits = () => hits;\n\n  const isSunk = () => hits.every((spot) => spot === 'hit');\n\n  return { id, length, hit, getHits, isSunk, getDirection, changeDirection };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);\n\n//# sourceURL=webpack://battleship/./src/shipFactory.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;