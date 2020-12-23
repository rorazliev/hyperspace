import Body from './body';

export default class Ship extends Body {
  constructor (image, canvas) {
    super(image, 0.1);
    this.x = (canvas.width / 2) - (this.width / 2);
    this.y = (canvas.height / 2) - (this.height / 2);
  }

  moveLeft () {
    this.x -= 1;
  }

  moveRight () {
    this.x += 1;
  }

  moveUp () {
    this.y -= 1;
  }

  moveDown () {
    this.y += 1;
  }
}
