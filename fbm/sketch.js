const SIZE = 1024;

let g, s, noise, font1;
let t = 0;

function preload() {
  s = loadShader("shader.vert", "shader.frag");
  noise = loadImage("perlin1024.png");
  font1 = loadFont("valverde.otf");
}

function setup() {
  createCanvas(SIZE, SIZE, WEBGL);
  noStroke();
  g = createGraphics(SIZE, SIZE, WEBGL);

}

function draw() {
  t++;
  g.textSize(77);
  g.textAlign(LEFT, CENTER);
  g.stroke(0);
  g.textFont(font1);
  g.strokeWeight(2);
  g.text("hello.", -64, -28);
  g.text("computer", -64, 28);
  background(25);
  shader(s);
  s.setUniform("u_time", millis() / 1000.0);
  s.setUniform("u_noise", noise);
  s.setUniform("u_tex", g)
  rect(0, 0, SIZE, SIZE);
}
