export default class Space {
  constructor (image, y) {
    this.image = image;
    this.x = 0;
    this.y = y;
  }

  update (other, speed, canvasHeight) {
    this.y += speed / 4;

    if (this.y > canvasHeight) {
      this.y = other.y - canvasHeight + (speed / 4);
    }
  }
}
