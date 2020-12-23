import Body from './body';
import {randomNumber} from './helpers';

export default class Meteor extends Body {
  constructor (image, scale, canvas) {
    super(image, scale);
    this.x = randomNumber(0, canvas.width - this.width);
    this.y = 0 - this.height;
  }

  update (speed) {
    this.y += speed;
  }
}
