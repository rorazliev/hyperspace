import meteor from './media/meteor.png';
import ship from './media/ship.png';
import space from './media/space.jpg';
import Game from './src/game.js';
import {loadImage} from './src/helpers.js';

Promise.all([
  loadImage(meteor),
  loadImage(ship),
  loadImage(space)
]).then((resources) => {
  const game = new Game('canvas', resources);
});
