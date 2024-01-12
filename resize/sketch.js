const SIZE = 512;
const GRANULARITY = 10;

let speedX, speedY

let currX, currY;

let xs = [0];
let ys = [0];
let xt = 0.0;
let yt = 0.0;
let xn, yn, xp, yp;

let dir = -1.0;

function setup() {
  createCanvas(SIZE, SIZE);
  noStroke();
  for (let i = 0; i < GRANULARITY; i++) {
    xs.push(random(SIZE));
    ys.push(random(SIZE));
  }
  xs.sort((a, b) => a - b);
  xs.push(SIZE);

  ys.sort((a, b) => a - b);
  ys.push(SIZE);
}

function draw() {
  background(42, 69);
  drawStuff();
  updateStuff();
}

function drawStuff() {
  for (let i = 0; i < GRANULARITY + 2; i++) {
    // line(xs[i], 0, xs[i], SIZE);
    // line(0, ys[i], SIZE, ys[i]);
    for (let j = 0; j < GRANULARITY + 2; j++) {
      let w = xs[i + 1] - xs[i];
      let h = ys[j + 1] - ys[j];
      let x = (xs[i] + xs[i + 1]) / 2;
      let y = (ys[j] + ys[j + 1]) / 2;
      
      fill(
        w*1.6,
        (x+y)* 0.25 + 192,
        h*1.6,
      )
      ellipse(x, y, w, h);
    }
  }
}

function updateStuff() {
  speedX = sin(millis()/1000) * 0.1 + 0.15;
  speedY = cos(millis()/1000) * 0.1 + 0.15;
  if (xt <= 0 || abs(xp - xn) < 10) {
    dir = -dir;
    currX = floor(random(xs.length - 2)) + 1;
    xp = xs[currX];
    xn = xs[currX + dir];
    xn = random(xp, xn);
    xt = 1.0;
  } else {
    xt = max(0, xt - speedX);
    let x = lerp(xp, xn, 1.0 - xt);
    xs[currX] = x;
  }

  if (yt <= 0 || abs(yp - yn) < 10) {
    dir = -dir;
    currY = floor(random(ys.length - 2)) + 1;
    yp = ys[currY];
    yn = ys[currY + dir];
    yn = random(yp, yn);
    yt = 1.0;
  } else {
    yt = max(0, yt - speedY);
    let y = lerp(yp, yn, 1.0 - yt);
    ys[currY] = y;
  }
}
