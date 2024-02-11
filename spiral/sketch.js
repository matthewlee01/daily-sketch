const SIZE = 512;

let g1, g2, s, img1, img2, font1;
let t = 0;

function preload() {
  s = loadShader("shader.vert", "shader.frag");
  img1 = loadImage("blue470blurred.png");
  font1 = loadFont("mondwest.otf");
}

function setup() {
  createCanvas(SIZE, SIZE, WEBGL);

}

function draw() {
  t++;
  background(20);
  shader(s);
  s.setUniform("u_time", millis() / 1000.0 - 8.0);
  s.setUniform("u_noise", img1);
  rect(0, 0, SIZE, SIZE);
  text("hello", 0, 0);
}
