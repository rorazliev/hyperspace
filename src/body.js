export default class Body {
  constructor (x, y, image, scale) {
    this.x = x;
    this.y = y;
    this.image = new Image;
    this.image.src = src;
    this.scale = scale;
  }

  get x () {
    return this._x;
  }

  set x (value) {
    this._x = value || 0;
  }

  get y () {
    return this._y;
  }

  set y (value) {
    this._y = value || 0;
  }

  get width () {
    return this.image.width * this.scale;
  }

  get height () {
    return this.image.height * this.scale;
  }

  get top () {
    return this.y;
  }

  get bottom () {
    return this.y + this.height;
  }

  get left () {
    return this.x;
  }

  get right () {
    return this.x + this.width;
  }

  overlaps (other) {
    return this.top < other.bottom &&
    this.bottom > other.top &&
    this.left < other.right &&
    this.right > other.left;
  }
}
