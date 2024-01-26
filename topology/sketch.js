const SIZE = 1024;
const RADIUS = 20;

let xs = [10, 10, -10, -10];
const XRS = [10, -10, -10, 10];
let xos = [10, -10, -10, 10];

let ys = [10, -10, -10, 10];
const YRS = [-10, -10, 10, 10];
let yos = [-10, -10, 10, 10];

let oldX = SIZE/2;
let oldY = SIZE/2;
let newX, newY; 
let t = 0;

const L = xs.length;

function setup() {
  createCanvas(SIZE, SIZE);
}

function draw() {
  background(0);
  noFill();
  translate(width/2, height/2);
  rotate(frameCount / 666);

  for (let i = 0; i < L; i++) {
    xos[i] = XRS[i] * (sin(frameCount / (88*(i+1))) * 0.4 + 0.6)
    yos[i] = YRS[i] * (cos(frameCount / (77*(4-i))) * 0.4 + 0.6)
  }

  strokeWeight(0.4);
  stroke(255);
  for (let i = 0; i < RADIUS; i++) {
    fill(i * 8, 200, 100, i*1.5);
    let d = pow(i*0.5, 1.8);

    beginShape();
    vertex(xs[0] * d, ys[0] * d);
    bezierVertex(
      (xs[0] + xos[0]) * d,
      (ys[0] + yos[0]) * d,
      (xs[1] - xos[1]) * d,
      (ys[1] - yos[1]) * d,
      xs[1] * d,
      ys[1] * d
    );
    bezierVertex(
      (xs[1] + xos[1]) * d,
      (ys[1] + yos[1]) * d,
      (xs[2] - xos[2]) * d,
      (ys[2] - yos[2]) * d,
      xs[2] * d,
      ys[2] * d
    );
    bezierVertex(
      (xs[2] + xos[2]) * d,
      (ys[2] + yos[2]) * d,
      (xs[3] - xos[3]) * d,
      (ys[3] - yos[3]) * d,
      xs[3] * d,
      ys[3] * d
    );
    bezierVertex(
      (xs[3] + xos[3]) * d,
      (ys[3] + yos[3]) * d,
      (xs[0] - xos[0]) * d,
      (ys[0] - yos[0]) * d,
      xs[0] * d,
      ys[0] * d
    );
    endShape();
  }
}
