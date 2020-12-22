export default class Game {
  constructor (canvasId, resources) {
    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext('2d');

    this.resources = resources;

    this.resources.forEach(resource => console.log(resource));

    this.handleCanvasResize();
    window.addEventListener('resize', () => this.handleCanvasResize());
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
}
