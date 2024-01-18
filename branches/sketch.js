const SIZE = 1024;
const LOW_RANGE = SIZE / 16;
const HIGH_RANGE = (15 * SIZE) / 16;
const BRIGHTNESS = 256;

let g1, g2, g3, g4, s, blurH, blurV, img;
let t = 0;

let r = 100;
let dr = 5;

let step = 1;
let x = SIZE / 2;
let y = SIZE / 2;
let x1, y1, x2, y2, x3, y3, x4, y4;

function preload() {
  s = loadShader("shader.vert", "shader.frag");
  blurH = loadShader("shader.vert", "blur.frag");
  blurV = loadShader("shader.vert", "blur.frag");
  img = loadImage("perlin1024.png");
}

function setup() {
  pixelDensity(1);
  smooth();
  createCanvas(SIZE, SIZE);

  g1 = createGraphics(SIZE, SIZE);
  g2 = createGraphics(SIZE, SIZE, WEBGL);
  g2.noStroke();
  g3 = createGraphics(SIZE, SIZE, WEBGL);
  g3.noStroke();
  g4 = createGraphics(SIZE, SIZE, WEBGL);
  g4.noStroke();
}

function draw() {
  // canvas buffer
  g1.background(0, 10);

  updateBall();
  g1.strokeWeight(r / 8);
  g1.stroke((3 * BRIGHTNESS) / 4);
  g1.fill(BRIGHTNESS);
  g1.circle(x, y, r);
  g1.fill(0);
  g1.stroke(0);
  g1.circle(x, y, r/3);

  // horizontal blur
  g2.shader(blurH);
  blurH.setUniform("tex0", g1);
  blurH.setUniform("texelSize", [1.0 / width, 1.0 / height]);
  blurH.setUniform("direction", [1.0, 0.0]);

  g2.rect(0, 0, width, height);

  // vertical blur
  g3.shader(blurV);
  blurV.setUniform("tex0", g2);
  blurV.setUniform("texelSize", [1.0 / width, 1.0 / height]);
  blurV.setUniform("direction", [0.0, 1.0]);

  g3.rect(0, 0, width, height);

  g4.shader(s);
  s.setUniform("u_resolution", [width, height]);
  s.setUniform("u_mouse", [mouseX, mouseY]);
  s.setUniform("u_time", millis() / 1000.0);
  s.setUniform("u_tex", g3);
  s.setUniform("u_noise", img);

  g4.background(0);
  g4.rect(0, 0, SIZE, SIZE);
  image(g4, 0, 0, SIZE, SIZE);
  // image(g1, 0, 0, SIZE, SIZE);
}

function updateBall() {
  if (step >= 1) {
    x1 = x;
    y1 = y;

    x2 = random(LOW_RANGE + r, HIGH_RANGE - r);
    y2 = random(LOW_RANGE + r, HIGH_RANGE - r);
    x3 = random(LOW_RANGE + r, HIGH_RANGE - r);
    y3 = random(LOW_RANGE + r, HIGH_RANGE - r);
    x4 = random(LOW_RANGE + r, HIGH_RANGE - r);
    y4 = random(LOW_RANGE + r, HIGH_RANGE - r);

    dr = random(-2, 2);

    step = 0;
  } else {
    step += 0.012;
  }

  let a = pow(0.5 - abs(0.5 - step), 2) * 10;

  r = min(SIZE / 5, max(SIZE / 16, r + dr*a));

  x = bezierPoint(x1, x2, x3, x4, step);
  y = bezierPoint(y1, y2, y3, y4, step);
}
