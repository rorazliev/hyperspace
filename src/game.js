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

    this.speed = 1;
    this.start();
  }

  step () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (randomNumber(0, 1000) > 990) {
      if (this.meteors.length < 10) {
        this.meteors.push(new Meteor(this.resources[0], 0.1, this.canvas));
      }
    }

    this.meteors.forEach(meteor => {
      meteor.update(this.speed);
      this.draw(meteor);
      if (meteor.top >= this.canvas.height) {
        this.meteors.shift();
      }
    });

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
        this.player.moveLeft(this.speed);
        break;
      case 39:
        this.player.moveRight(this.speed);
        break;
      case 38:
        this.player.moveUp(this.speed);
        break;
      case 40:
        this.player.moveDown(this.speed);
        break;
    }
  }

  pause () {
    clearInterval(this.timer);
  }

  start () {
    this.timer = setInterval(() => this.step(), 1000/120);
  }
}
