const SIZE = 512;
const GSIZE = 32;

let g1, s, img;
let t = 0;

function preload() {
  s = loadShader("shader.vert", "shader.frag");
  img = loadImage("image.jpg");
}

function setup() {
  pixelDensity(1);
  smooth();
  createCanvas(SIZE, SIZE, WEBGL);

  g1 = createGraphics(GSIZE, GSIZE, WEBGL);
  g1.angleMode(DEGREES);
  g1.noStroke();
}

function draw() {
  t += 0.016;
  g1.push();
  g1.background(255);
  g1.fill(192);
  g1.circle(cos(PI*sin(t)) * GSIZE/3, sin(TWO_PI*cos(t)) * GSIZE/3, 8);
  g1.circle(sin(PI*cos(t)) * GSIZE/3, cos(TWO_PI*sin(t)) * GSIZE/3, 8);
  g1.fill(96);
  g1.circle(cos(PI*sin(t+0.16)) * GSIZE/3, sin(TWO_PI*cos(t+0.16)) * GSIZE/3, 8);
  g1.circle(sin(PI*cos(t+0.16)) * GSIZE/3, cos(TWO_PI*sin(t+0.16)) * GSIZE/3, 8);
  g1.fill(0);
  g1.circle(cos(PI*sin(t+0.32)) * GSIZE/3, sin(TWO_PI*cos(t+0.32)) * GSIZE/3, 8);
  g1.circle(sin(PI*cos(t+0.32)) * GSIZE/3, cos(TWO_PI*sin(t+0.32)) * GSIZE/3, 8);

  g1.pop();

  shader(s);
  s.setUniform("u_resolution", [g1.width, g1.height]);
  s.setUniform("u_mouse", [mouseX, mouseY]);
  s.setUniform("u_time", millis() / 1000.0);
  s.setUniform("u_tex", g1);
  s.setUniform("u_noise", noise);

  background(0);
  rect(0, 0, SIZE, SIZE);
}
