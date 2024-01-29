const SIZE = 512;

let angle = 0;
let radius = 256;

function setup() {
  createCanvas(SIZE, SIZE);
}

function draw() {
  let angle = easeInOut((frameCount / 180) % 1) * TWO_PI;
  background(255);
  fill(255);
  stroke(0);

  line(10, 0, 10, height);
  line(0, 10, width, 10);

  push();
  translate(8.5*width/10, 8.5*height/10);
  rotate(PI / 2);
  circle(0, 0, 20);
  fill(0);
  arc(0, 0, 20, 20, 0, angle);
  pop();

  push();
  translate(width / 5.5, height / 5.5);
  fill(255 * (1 - angle / TWO_PI));
  circle(lerp(0, 69, angle/TWO_PI), 0, 32);
  circle(lerp(0, 69, angle/TWO_PI), 69, 32);
  fill(255 * (angle / TWO_PI));
  circle(lerp(69, 0, angle/TWO_PI), lerp(0, 69, angle/TWO_PI), 32);
  circle(lerp(69, 0, angle/TWO_PI), lerp(69, 0, angle/TWO_PI), 32);
  pop();

  push();
  translate(width / 1.6, height / 1.6);
  rotate(PI / 2);
  circle(0, 0, radius);

  push();
  rotate(angle);
  translate((3 * radius) / 8, 0);
  circle(0, 0, radius / 4);
  pop();

  noFill();
  stroke(0, 0, 0, 255 * (1 - angle / TWO_PI));
  arc(0, 0, radius * 1.05, radius * 1.05, 0, min(angle + 0.01, PI / 2));
  stroke(0, 0, 0, 255 * (1 - (angle - PI / 2) / (TWO_PI - PI / 2)));
  if (angle > PI / 2) {
    arc(
      0,
      0,
      radius * 1.1,
      radius * 1.1,
      PI / 2,
      min(angle + 0.01, PI / 2 + PI / 4)
    );
  }
  stroke(
    0,
    0,
    0,
    255 * (1 - (angle - PI / 2 - PI / 4) / (TWO_PI - PI / 2 - PI / 4))
  );
  if (angle > PI / 2 + PI / 4) {
    arc(
      0,
      0,
      radius * 1.15,
      radius * 1.15,
      PI / 2 + PI / 4,
      min(angle + 0.01, (3 * PI) / 2)
    );
  }
  push();
}

function easeInOut(x) {
  return -(Math.cos(Math.PI * x) - 1) / 2;
}
