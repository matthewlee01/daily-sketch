let x = 0.0;
let y = 0.0;
let r = 0.0;
let g = 0.0;
let b = 0.0;
let t = 0;
let depth = 1;

let transforms = [
  // 1: stems
  {
    matrix: [
      [0.0, 0.0],
      [0.0, 0.18],
    ],
    vector: [0.0, 0.0],
  },
  // 2: smaller leaves
  {
    matrix: [
      [0.85, 0.04],
      [-0.04, 0.85],
    ],
    vector: [0.0, 1.6],
  },
  // 3: largest left leaf
  {
    matrix: [
      [0.2, -0.26],
      [0.23, 0.22],
    ],
    vector: [0.0, 1.6],
  },
  // 4: largest right leaf
  {
    matrix: [
      [-0.15, 0.28],
      [0.26, 0.24],
    ],
    vector: [0.0, 0.44],
  },
];
function setup() {
  let c = createCanvas(500, 500);
  c.parent("container");
  stroke(200);
  strokeWeight(2);
  background(42);
}

function draw() {
  if (t < 150) {
    drawFrame();
  }
  t++;
}

function drawFrame() {
  for (i = 0; i < 1000; i++) {
    drawPoint();
    setNextCoords();
  }
}

function drawPoint() {
  strokeWeight(2 / depth);
  stroke(r, g + depth * 80, b + depth * 20);
  let px = map(x, -2.182 * 1.1, 2.6558 * 1.1, 0, width);
  let py = map(y, 0, 9.9983 * 1.1, height, 0);
  point(px, py);
}

function setNextCoords() {
  let rand = random();
  let i;
  if (rand < 0.01) {
    i = 0;
    r = 120;
    g = 20;
    b = 0;
    depth = 1;
  } else if (rand < 0.84) {
    i = 1;
    r = r + 1;
    g = g + 1;
    b = b + 0.5;
    depth = depth * 1.1;
  } else if (rand < 0.92) {
    i = 2;
    r = 220;
    g = 120;
    depth = 1;
  } else {
    i = 3;
    r = 220;
    g = 80;
    depth = 1;
  }
  applyTransform(transforms[i]);
}

function applyTransform(transform) {
  let m = transform.matrix;
  let v = transform.vector;
  nextX = x * m[0][0] + y * m[0][1] + v[0];
  nextY = x * m[1][0] + y * m[1][1] + v[1];
  x = nextX;
  y = nextY;
}
