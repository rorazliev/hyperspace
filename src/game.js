import Ship from './ship';

export default class Game {
  constructor (canvasId, resources) {
    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext('2d');

    this.resources = resources;

    this.handleCanvasResize();
    window.addEventListener('resize', () => this.handleCanvasResize());

    this.player = new Ship(resources[1], this.canvas);
    window.addEventListener('keydown', (event) => this.handleKeydown(event));

    this.timer = setInterval(() => this.animate(), 1000/120);
  }

  animate () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.draw(this.player);
  }

  draw (other) {
    this.context.drawImage(
      other.image,
      0,
      0,
      other.image.width,
      other.image.height,
      other.x,
      other.y,
      other.width,
      other.height
    );
  }

  handleCanvasResize () {
    let height = window.innerHeight;
    let width = window.innerWidth;

    if (height <= width) {
      this.canvas.height = height;
      this.canvas.width = height;
    }
    else {
      this.canvas.height = width;
      this.canvas.width = width;
    }
  }

  handleKeydown (event) {
    switch (event.keyCode) {
      case 37:
        this.player.moveLeft();
        break;
      case 39:
        this.player.moveRight();
        break;
      case 38:
        this.player.moveUp();
        break;
      case 40:
        this.player.moveDown();
        break;
    }
  }
}
