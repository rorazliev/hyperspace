import Body from './body';
import {DIRECTION} from './direction';


export default class Ship extends Body {
  constructor (image, canvas) {
    super(image, 0.1);
    this.x = (canvas.width / 2) - (this.width / 2);
    this.y = (canvas.height / 2) - (this.height / 2);
    this.direction = DIRECTION.IDLE;
    this.canvas = canvas;
  }

  move (speed) {
    if (this.direction == DIRECTION.UP) {
      this.y -= speed;
      if (this.y < 0) {
        this.y = 0;
      }
    }
    if (this.direction == DIRECTION.DOWN) {
      this.y += speed;
      if (this.y + this.height > this.canvas.height) {
        this.y = this.canvas.height - this.height;
      }
    }
    if (this.direction == DIRECTION.LEFT) {
      this.x -= speed;
      if (this.x < 0) {
        this.x = 0;
      }
    }
    if (this.direction == DIRECTION.RIGHT) {
      this.x += speed;
      if (this.x + this.width > this.canvas.width) {
        this.x = this.canvas.width - this.width;
      }
    }
  }
}
