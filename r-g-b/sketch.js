const SIZE = 512;

let g1, g2, s, img1, img2, font1;
let t = 0;

function preload() {
  s = loadShader("shader.vert", "shader.frag");
  img1 = loadImage("perlin512.png");
  img2 = loadImage("perlin1000.png");
  font1 = loadFont("mondwest.otf");
}

function setup() {
  pixelDensity(1);
  smooth();
  createCanvas(SIZE, SIZE);

  g1 = createGraphics(SIZE, SIZE, WEBGL);
  g1.angleMode(DEGREES);
  g1.textFont(font1);
  g1.stroke(250);
  g1.textSize(42);
  g2 = createGraphics(SIZE, SIZE, WEBGL);
}

function draw() {
  t++;
  background(200);
  fill(200);
  g1.background(0);
  g1.pointLight(60, 60, 60, 128, -128, -50);
  g1.ambientLight(10);

  g1.push();
  g1.translate(-128, 128);
  g1.rotateX(sin(millis() / 6900) * 360);
  g1.rotateY(sin(millis() / 4200) * 360);
  g1.box(88, 88, 88, 4, 4);
  g1.pop();

  g1.push();
  g1.translate(-128, -128);
  g1.rotateX(sin(millis() / 5000) * 360);
  g1.rotateY(sin(millis() / 8800) * 360);
  g1.box(88, 88, 88, 4, 4);
  g1.pop();

  g1.push();
  g1.translate(128, -128);
  g1.rotateX(sin(millis() / 8800) * 360);
  g1.rotateY(sin(millis() / 6900) * 360);
  g1.box(88, 88, 88, 4, 4);
  g1.pop();

  g1.push();
  g1.fill(88*sin(millis()/666)+169);
  g1.text("@hello", 42, 118);
  g1.text(".computer", 42, 148);
  g1.pop();

  g2.shader(s);
  s.setUniform("u_resolution", [width, height]);
  s.setUniform("u_mouse", [mouseX, mouseY]);
  s.setUniform("u_time", millis() / 1000.0);
  s.setUniform("u_tex", g1);
  s.setUniform("u_noise1", img1);
  s.setUniform("u_noise2", img2);

  g2.background(0);
  g2.rect(0, 0, SIZE, SIZE);
  // image(g2, 0, 0, SIZE, SIZE);
  image(g1, 0, 0, SIZE, SIZE);
}
