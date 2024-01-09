const SIZE = 500;
const GAP = 4;
const DEPTH = 32;
const SPEED = 0.2;

let points;

let rs = [15, 73, 249, 255];
let gs = [32, 103, 224, 147];
let bs = [32, 103, 143, 1];

function setup() {
  createCanvas(SIZE, SIZE);
  points = [
    {
      x: SIZE / 2,
      y: SIZE / 2,
      r: rs[0],
      g: gs[0],
      b: bs[0],
      dx: random(-SPEED, SPEED),
      dy: random(-SPEED, SPEED),
    },
    {
      x: SIZE / 2,
      y: SIZE / 2 + GAP,
      r: rs[1],
      g: gs[1],
      b: bs[1],
      dx: random(-SPEED, SPEED),
      dy: random(-SPEED, SPEED),
    },
    {
      x: SIZE / 2 - GAP,
      y: SIZE / 2 + GAP,
      r: rs[2],
      g: gs[2],
      b: bs[2],
      dx: random(-SPEED, SPEED),
      dy: random(-SPEED, SPEED),
    },
    {
      x: SIZE / 2 - GAP,
      y: SIZE / 2 - GAP,
      r: rs[3], 
      g: gs[3],
      b: bs[3],
      dx: random(-SPEED, SPEED),
      dy: random(-SPEED, SPEED),
    },
  ];
  for (let i = 1; i < DEPTH; i++) {
    let prev = points[points.length - 1];
    points.push({
      x: prev.x + 2 * i * GAP + random(-1, 1),
      y: prev.y + random(-1, 1),
      r: rs[0] + i,
      g: gs[0] + i,
      b: bs[0] + i,
      dx: random(-SPEED, SPEED),
      dy: random(-SPEED, SPEED),
    });
    prev = points[points.length - 1];
    points.push({
      x: prev.x + random(-1, 1),
      y: prev.y + (2 * i + 1) * GAP + random(-1, 1),
      r: rs[1] + i,
      g: gs[1] + i,
      b: bs[1] + i,
      dx: random(-SPEED, SPEED),
      dy: random(-SPEED, SPEED),
    });
    prev = points[points.length - 1];
    points.push({
      x: prev.x - (2 * i + 1) * GAP + random(-1, 1),
      y: prev.y + random(-1, 1),
      r: rs[2] + i,
      g: gs[2] + i,
      b: bs[2] + i,
      dx: random(-SPEED, SPEED),
      dy: random(-SPEED, SPEED),
    });
    prev = points[points.length - 1];
    points.push({
      x: prev.x + random(-1, 1),
      y: prev.y - (2 * i + 2) * GAP + random(-1, 1),
      r: rs[3] + i,
      g: gs[3] + i,
      b: bs[3] + i,
      dx: random(-SPEED, SPEED),
      dy: random(-SPEED, SPEED),
    });
  }
}

function draw() {
  background(40);
  for (let i = 0; i < points.length - 1; i++) {
    let a = points[i];
    let b = points[i + 1];
    if (millis() > 8000 + (i * 64)) {
      let dxx = a.dx + b.dx;
      if (
        a.x + dxx > SIZE ||
        b.x + dxx > SIZE ||
        a.x + dxx < 0 ||
        b.x + dxx < 0
      ) {
        a.dx = -a.dx;
        b.dx = -b.dx;
        dxx = -dxx;
      }
      a.x += dxx;
      b.x += dxx;

      let dyy = a.dy + b.dy;
      if (
        a.y + dyy > SIZE ||
        b.y + dyy > SIZE ||
        a.y + dyy < 0 ||
        b.y + dyy < 0
      ) {
        a.dy = -a.dy;
        b.dy = -b.dy;
        dyy = -dyy;
      }
      a.y += dyy;
      b.y += dyy;

      let dr = (b.r - a.r) / 500;
      a.r += dr;
      b.r -= dr;
      let dg = (b.g - a.g) / 500;
      a.g += dg;
      b.g -= dg;
      let db = (b.b - a.b) / 500;
      a.b += db;
      b.b -= db;
    }
    strokeWeight(0.4);
    stroke(a.r, a.g, a.b, 200);
    line(a.x, a.y, b.x, b.y);
  }
}
