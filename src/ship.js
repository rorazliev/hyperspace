import Body from './body';

export default class Ship extends Body {
  constructor (image, canvas) {
    super(image, 0.1);
    this.x = (canvas.width / 2) - (this.width / 2);
    this.y = (canvas.height / 2) - (this.height / 2);
    this.canvas = canvas;
  }

  moveLeft (speed) {
    this.x -= speed;
    if (this.x < 0) {
      this.x = 0;
    }
  }

  moveRight (speed) {
    this.x += speed;
    if (this.x + this.width > this.canvas.width) {
      this.x = this.canvas.width - this.width;
    }
  }

  moveUp (speed) {
    this.y -= speed;
    if (this.y < 0) {
      this.y = 0;
    }
  }

  moveDown (speed) {
    this.y += speed;
    if (this.y + this.height > this.canvas.height) {
      this.y = thdasis.canvas.height - this.height;
    }
  }
}
