import {DIRECTION} from './direction';
import {LEVELING} from './leveling';
import Meteor from './meteor';
import {randomNumber} from './randomNumber';
import Ship from './ship';
import Space from './space';

export default class Game {
  constructor (resources) {
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');

    this.resizeCanvas();

    this.resources = resources;

    this.player = new Ship(resources[1], this.canvas);
    this.meteors = [];
    this.space = [
      new Space(this.resources[2], 0),
      new Space(this.resources[2], this.canvas.height)
    ];

    this.isRunning = false;
    this.isOver = false;

    this.speed = 5;
    this.level = 1;
    this.score = 0;

    this.menu();
    this.listen();
  }

  draw () {
    this.context.clearRect(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

    this.context.fillStyle = '#10121e';
    this.context.fillRect(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

    this.space.forEach(space => {
      this.context.drawImage(
        space.image,
        0,
        0,
        space.image.width,
        space.image.height,
        space.x,
        space.y,
        this.canvas.width,
        this.canvas.height
      )
    });

    this.meteors.forEach((meteor) => {
      this.renderObject(meteor);
    });


    this.renderObject(this.player);

    this.context.font = 'bold 18px Monospace';
    this.context.fillStyle = '#ffffff';
    this.context.textBaseline = 'middle';
    this.context.textAlign = 'start';
    this.context.fillText(`Level: ${this.level}`, 20, 20);
    this.context.fillText(`Score: ${this.score}`, 20, 48);
  }

  loop () {
    this.update();
    this.draw();

    if (!this.isOver) {
      requestAnimationFrame(() => this.loop());
    }
  }

  listen () {
    document.addEventListener('keydown', (key) => {
      if (!this.isRunning) {
        this.isRunning = true;
        requestAnimationFrame(() => this.loop());
      }

      if (key.keyCode == 38 || key.keyCode == 87) {
        this.player.direction = DIRECTION.UP;
      }
      if (key.keyCode == 40 || key.keyCode == 83) {
        this.player.direction = DIRECTION.DOWN;
      }
      if (key.keyCode == 37 || key.keyCode == 65) {
        this.player.direction = DIRECTION.LEFT;
      }
      if (key.keyCode == 39 || key.keyCode == 68) {
        this.player.direction = DIRECTION.RIGHT;
      }
    });

    document.addEventListener('keyup', (key) => {
      this.player.direction = DIRECTION.IDLE;
    });
  }

  menu () {
    this.draw();

    this.context.font = 'bold 18px Monospace';
    this.context.fillStyle = '#ffffff';
    this.context.textBaseline = 'middle';
    this.context.textAlign = 'center';
    this.context.fillText('Use arrows to move',
      this.canvas.width / 2,
      this.canvas.height - 76
    );
  }

  renderObject (body) {
    this.context.drawImage(
      body.image,
      0,
      0,
      body.image.width,
      body.image.height,
      body.x,
      body.y,
      body.width,
      body.height
    )
  }

  resizeCanvas () {
    let width = window.innerWidth;
    let height = window.innerHeight;

    if (height <= width) {
      this.canvas.height = height;
      this.canvas.width = height;
    }
    else {
      this.canvas.height = width;
      this.canvas.width = width;
    }
  }

  update () {
    this.space[0].update(this.space[1], this.speed, this.canvas.height);
    this.space[1].update(this.space[0], this.speed, this.canvas.height);

    if (randomNumber(0, 1000) > 950) {
      if (this.meteors.length < 15) {
        this.meteors.push(new Meteor(this.resources[0], 0.1, this.canvas));
      }
    }

    this.meteors.forEach(meteor => {
      meteor.move(this.speed);
      if (meteor.top >= this.canvas.height) {
        this.meteors.shift();
        this.score += 10;
      }
      if (this.player.overlaps(meteor)) {
        this.isOver = true;
      }
    });

    LEVELING.forEach(level => {
      if (this.score == level.score) {
        this.level = level.level;
        this.speed = level.speed;
      }
    });
    this.player.move(this.speed);
  }
}
