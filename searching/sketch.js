const SIZE = 512;

const count = 32;
let t1, t2;
let skew;

function setup() {
  createCanvas(SIZE, SIZE);
  skew = SIZE/3;
  noFill();
}

function draw() {
  background(42);
  translate(0, height/2);

  for (let i = 1; i <= count; i++) {
    stroke(29, 161, 242)
    t1 = sin((frameCount) * 0.031);
    t2 = sin((frameCount + 2000) * 0.031);
    let y1 = (2*(i-0.5) * t1) * 2;
    let y2 = -(2*(i-0.5) * t2) * 2;
    strokeWeight(1 + i/count);
    bezier(0, y1, 0, y1, width-skew, -y2, width, -y2);
    strokeWeight(1 - i/count);
    bezier(0, -y1, 0, -y1, width-skew, y2, width, y2);
  }
}
