export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function loadImage(src) {
  return new Promise((resolve) => {
    let image = new Image;
    image.addEventListener('load', () => {
      resolve(image);
    });
    image.addEventListener('error', (error) => {
      reject(error);
    })
    image.src = src;
  });
}
