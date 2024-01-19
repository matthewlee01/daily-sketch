const SIZE = 512;

let g1, g2, g3, g4, dither, blurH, blurV, noise;
let t = 0;

function preload() {
  dither = loadShader("shader.vert", "shader.frag");
  blurH = loadShader("shader.vert", "blur.frag");
  blurV = loadShader("shader.vert", "blur.frag");
  noise = loadImage("bluetile.png");
}

function setup() {
  pixelDensity(1);
  smooth();
  createCanvas(SIZE, SIZE);

  g1 = createGraphics(SIZE, SIZE, WEBGL);
  g1.angleMode(DEGREES);
  g1.noStroke();
  g1.textSize(42);
  g2 = createGraphics(SIZE, SIZE, WEBGL);
  g3 = createGraphics(SIZE, SIZE, WEBGL);
  g4 = createGraphics(SIZE, SIZE, WEBGL);
}

function draw() {
  t++;
  g1.push();
  g1.fill(250);
  g1.background(0);
  g1.pointLight(200, 200, 200, 0, 0, 180);
  // g1.ambientLight(1);

  g1.push();
  g1.translate(sin(1.6*cos(millis()/2222))*SIZE/3, sin(1.9*cos(millis()/1234))*SIZE/3)
  g1.sphere(69);
  g1.pop();

  g1.pop();

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

  g4.shader(dither);
  dither.setUniform("u_resolution", [width, height]);
  dither.setUniform("u_mouse", [mouseX, mouseY]);
  dither.setUniform("u_time", millis() / 1000.0);
  dither.setUniform("u_tex", g1);
  dither.setUniform("u_noise", noise);

  g4.background(0);
  g4.rect(0, 0, SIZE, SIZE);
  image(g4, 0, 0, SIZE, SIZE);
  // image(g1, 0, 0, SIZE, SIZE);
}
