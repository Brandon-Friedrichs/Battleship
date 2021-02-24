import Game from './game';
import { elements } from './elements';

const test = () => {
  console.log('test');
};

test();




let game = Game('one')

game.renderBothGrids();
game.renderPlayerOneFleet();
game.autoPlace();
game.startGame();

elements.playAgainBtn.addEventListener('click', () => {
  game.playAgain();
});

elements.autoPlaceBtn.addEventListener('click', () => {
  game.autoPlace();
});