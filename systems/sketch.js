const SIZE = 1024;

let x1 = SIZE / 2;
let y1 = SIZE / 2;

let xs = [];
let ys = [];

let nxs = [];
let nys = [];

let t = 0;

let L = 12;

function setup() {
  createCanvas(SIZE, SIZE);
  angleMode(DEGREES);

  for (let i = 0; i < L; i++) {
    xs.push(random(SIZE/10, 9*SIZE/10));
    ys.push(random(SIZE/10, 9*SIZE/10));
    nxs.push(random(SIZE/10, 9*SIZE/10));
    nys.push(random(SIZE/10, 9*SIZE/10));
  }
}

function draw() {
  background(0, 80);

  t += 0.01;
  if (t >= 1) {
    t = -1;
    for (let i = 0; i < L; i++) {
      xs[i] = nxs[i];
      ys[i] = nys[i];
      nxs[i] = random(SIZE/10, 9*SIZE/10);
      nys[i] = random(SIZE/10, 9*SIZE/10);
    }
  }

  noFill();
  for (let i = 0; i < L - 1; i++) {
    let x1 = lerp(xs[i], nxs[i], max(0, t));
    let y1 = lerp(ys[i], nys[i], max(0, t));
    let x2 = lerp(xs[i+1], nxs[i+1], max(0, t));
    let y2 = lerp(ys[i+1], nys[i+1], max(0, t));
    let x3 = lerp(xs[L - i - 1], nxs[L - i - 1], max(0, t));
    let y3 = lerp(ys[L - i - 1], nys[L - i - 1], max(0, t));
    let x4 = lerp(xs[L - i - 2], nxs[L - i - 2], max(0, t));
    let y4 = lerp(ys[L - i - 2], nys[L - i - 2], max(0, t));
    bezier(
      x4,
      y4,
      x1,
      y1,
      x3,
      y3,
      x2,
      y2,
    );
    // line(x1, y1, x2, y2);
  }

  for (let i = 0; i < L; i++) {
    let x1 = lerp(xs[i], nxs[i], max(0, t));
    let y1 = lerp(ys[i], nys[i], max(0, t));
    let r1 = lerp(((xs[i]+ys[i])%8 + 1) * 16, ((nxs[i]+nys[i])% 8 + 1) * 16, max(0, t));
    fill(0);
    stroke(255);
    circle(x1, y1, r1);
  }
}
