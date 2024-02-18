const SIZE = 1024;
const DETAIL = 64;

let x = SIZE / 2;
let y = SIZE / 2;

const BASEDX = SIZE / 4;
const BASEDY = SIZE / 4;

let dx, dy, dyy, yy;

function setup() {
  createCanvas(SIZE, SIZE);
}

function draw() {
  background(10, 60);
  stroke(250);
  noFill();
  strokeWeight(1);
  for (let i = 0; i < DETAIL; i++) {
    if (i % 2 == 0) {
      dyy = (i * SIZE) / (1.5 * DETAIL);
      yy = y + dyy;

      dx = (tan(4.2 * cos(millis() / 1369)) * 0.5 + 1) * BASEDX;
      dy = cos(6.9 * sin(millis() / 1248)) * 1.2 * BASEDY;

      stroke(255 - yy / 4, 40, 80);
      bezier(x, yy, x - dx, yy + dy, x - dx, yy - dy, x - SIZE / 2, yy);
      bezier(x, yy, x + dx, yy - dy, x + dx, yy + dy, x + SIZE / 2, yy);

      stroke(255 - yy / 4, 40, 80);
      yy = y - dyy;
      bezier(x, yy, x - dx, yy + dy, x - dx, yy - dy, x - SIZE / 2, yy);
      bezier(x, yy, x + dx, yy - dy, x + dx, yy + dy, x + SIZE / 2, yy);
    } else {
      dyy = (i * SIZE) / (1.5 * DETAIL);
      yy = y + dyy;

      dx = (sin(1.1 * cos(millis() / 666)) * 0.5 + 1) * BASEDX;
      dy = tan(2.2 * sin(millis() / 777)) * 1.2 * BASEDY;

      stroke(255 - yy / 4, 80, 180);
      bezier(x, yy, x - dx, yy + dy, x - dx, yy - dy, x - SIZE / 2, yy);
      bezier(x, yy, x + dx, yy - dy, x + dx, yy + dy, x + SIZE / 2, yy);

      stroke(255 - yy / 4, 80, 180);
      yy = y - dyy;
      bezier(x, yy, x - dx, yy + dy, x - dx, yy - dy, x - SIZE / 2, yy);
      bezier(x, yy, x + dx, yy - dy, x + dx, yy + dy, x + SIZE / 2, yy);
    }
  }
}
