import Ship from './ship';
import {randomNumber} from './helpers';
import Meteor from './meteor';

export default class Game {
  constructor (canvasId, resources) {
    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext('2d');

    this.resources = resources;

    this.handleCanvasResize();
    window.addEventListener('resize', () => this.handleCanvasResize());

    this.player = new Ship(resources[1], this.canvas);
    window.addEventListener('keydown', (event) => this.handleKeydown(event));

    this.meteors = [];

    this.score = 0;
    this.speed = 5;
    this.start();
  }

  step () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.generateMeteors();
    this.renderMeteors();

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

  generateMeteors () {
    if (randomNumber(0, 1000) > 990) {
      if (this.meteors.length < 15) {
        this.meteors.push(new Meteor(this.resources[0], 0.1, this.canvas));
      }
    }
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
      case 65:
        this.player.moveLeft(this.speed);
        break;
      case 39:
      case 68:
        this.player.moveRight(this.speed);
        break;
      case 38:
      case 87:
        this.player.moveUp(this.speed);
        break;
      case 40:
      case 83:
        this.player.moveDown(this.speed);
        break;
    }
  }

  pause () {
    clearInterval(this.timer);
  }

  renderMeteors () {
    this.meteors.forEach(meteor => {
      meteor.update(this.speed);
      this.draw(meteor);
      if (meteor.top >= this.canvas.height) {
        this.meteors.shift();
        this.score += 10;
        if (this.score % 100 === 0) {
          this.speed += 1;
        }
      }
      if (this.player.overlaps(meteor)) {
        this.pause();
      }
    });
  }

  start () {
    this.timer = setInterval(() => this.step(), 1000/120);
  }
}
