const SIZE = 512;
const SCALE = 48;
const DENSITY = 24;

let noise = [];

function setup() {
  createCanvas(SIZE, SIZE);
  for (let i = 0; i < DENSITY * DENSITY; i++) {
    noise.push(random(-10, 10));
  }
  strokeWeight(0.2);
}

function draw() {
  background(80, 70, 15);
  fill(40, 250, 40);
  for (let i = 0; i < DENSITY; i++) {
    for (let j = 0; j < DENSITY; j++) {
      leaf(
        (i * SIZE) / DENSITY + SIZE / (2 * DENSITY),
        (j * SIZE) / DENSITY - SCALE / 8,
        noise[i * DENSITY + j]
      );
    }
  }
}

function leaf(x, y, noise) {
  push();
  fill(
    120 - (40 * y) / SIZE + (40 * x) / SIZE+noise,
    190 - (60 * y) / SIZE - (40 * x) / SIZE+noise,
    50 - (40 * x) / SIZE+noise,
    240
  );
  let skew = 8 * sin((millis() + 2 * (x + y + noise)) / 888);
  let scale = SCALE + noise*2;
  translate(x + noise, y + noise);
  rotate(-noise / 32);
  beginShape();
  vertex(0, 0);
  bezierVertex(
    -scale / 2,
    scale / 4,
    -scale / 2 + skew,
    scale / 4,
    skew,
    scale
  );
  bezierVertex(scale / 2 + skew, scale / 4, scale / 2, scale / 4, 0, 0);
  endShape();
  bezier(0, -abs(noise), -skew / 8, scale / 8, -skew / 8, scale / 8, skew, scale);
  pop();
}
