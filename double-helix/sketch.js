const SIZE = 512;
let density = 20;
let gap = SIZE / density;

let c1, c2;

function setup() {
  createCanvas(SIZE, SIZE);
  c1 = color(71, 88, 92);
  c2 = color(200, 213, 187);
}

function draw() {
  background(c1);
  stroke(c2);
  strokeWeight(0.2);
  gap = ((sin(frameCount / 60) * 0.5 + 0.5) * SIZE) / density;
  for (let i = 0; i < density; i++) {
    line(i * gap, 0, SIZE, i * gap);
    line(SIZE, i * gap, SIZE - i * gap, SIZE);
    line(SIZE - i * gap, SIZE, 0, SIZE - i * gap);
    line(0, SIZE - i * gap, i * gap, 0);
  }
  twinkle(SIZE / 2, SIZE / 2, (frameCount / 30) % 1);
}

function twinkle(x, y, t) {
  let l = 10;
  translate(x, y);
  if (t > 0.5) {
    t -= 0.5;
    rotate(PI / 4);
  }
    line(0, 0, lerp(0, 0 + l, t * 2), 0);
    line(0, 0, lerp(0, 0 - l, t * 2), 0);
    line(0, 0, 0, lerp(0, 0 + l, t * 2));
    line(0, 0, 0, lerp(0, 0 - l, t * 2));
    strokeWeight(1);
    point(lerp(0, l, t), lerp(0, l, t));
    point(lerp(0, l, t), lerp(0, -l, t));
    point(lerp(0, -l, t), lerp(0, l, t));
    point(lerp(0, -l, t), lerp(0, -l, t));
}
