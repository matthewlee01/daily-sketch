const SIZE = 512;

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

  g1 = createGraphics(SIZE, SIZE, WEBGL);
  g1.angleMode(DEGREES);
  g1.noStroke();
}

function draw() {
  t++;
  g1.push();
  g1.background(25);

  g1.pop();

  shader(s);
  s.setUniform("u_resolution", [img.width, img.height]);
  s.setUniform("u_mouse", [mouseX, mouseY]);
  s.setUniform("u_time", millis() / 1000.0);
  s.setUniform("u_tex", img);
  s.setUniform("u_noise", noise);

  background(0);
  rect(0, 0, SIZE, SIZE);
  image(g1, 0, 0, SIZE, SIZE);
}
