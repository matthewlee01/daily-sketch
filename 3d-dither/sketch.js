const SIZE = 512;

let g1, g2, g3, g4, dither, blurH, blurV, noise;
let t = 0;

function preload() {
  dither = loadShader("shader.vert", "shader.frag");
  blurH = loadShader("shader.vert", "blur.frag");
  blurV = loadShader("shader.vert", "blur.frag");
  noise = loadImage("perlin512.png");
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
  t += 0.05;
  g1.push();
  g1.fill(46);
  g1.background(255, 20);

  g1.ambientLight(288, 288, 288);
  g1.pointLight(sin(t)*250, 250, cos(t)*250, 0, 0, 0);

  g1.rotateX(millis()/97);
  g1.rotateY(millis()/111);
  g1.rotateZ(millis()/57);

  g1.push();
  g1.translate(sin(t)*width/6.3, cos(t)*height/12.3, sin(t)*width/4.2);
  g1.sphere(23);
  g1.pop();

  g1.push();
  g1.translate(sin(t)*width/4.2, cos(t)*height/6.9, -sin(t)*width/5.5);
  g1.sphere(28);
  g1.pop();

  g1.push();
  g1.translate(sin(t)*width/3.2, -cos(t)*height/4.9, sin(t)*width/7.2);
  g1.sphere(14);
  g1.pop();

  g1.push();
  g1.translate(sin(t)*width/8.8, -cos(t)*height/7.7, -sin(t)*width/6.6);
  g1.sphere(16);
  g1.pop();

  g1.push();
  g1.translate(-sin(t)*width/3.6, cos(t)*height/4.8, sin(t)*width/7.8);
  g1.sphere(42);
  g1.pop();

  g1.push();
  g1.translate(-sin(t)*width/3.3, cos(t)*height/3.6, -sin(t)*width/9.9);
  g1.sphere(18);
  g1.pop();

  g1.push();
  g1.translate(-sin(t)*width/16, -cos(t)*height/32, sin(t)*width/8);
  g1.sphere(36);
  g1.pop();

  g1.push();
  g1.translate(-sin(t)*width/8.8, -cos(t)*height/4, -sin(t)*width/4);
  g1.sphere(12);
  g1.pop();

  g1.push();
  g1.translate(0, -cos(t)*cos(t)*height/4, -sin(t)*width/4);
  g1.sphere(28);
  g1.pop();

  g1.push();
  g1.translate(-sin(t)*width/8.8, 0, -sin(t)*width/16);
  g1.sphere(22);
  g1.pop();

  g1.push();
  g1.translate(-sin(t)*width/8.8, -cos(t)*height/4, 0);
  g1.sphere(18);
  g1.pop();

  g1.push();
  g1.translate(0, -cos(t)*height/8, 0);
  g1.sphere(46);
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

  g4.background(255, 0, 0);
  g4.rect(0, 0, SIZE, SIZE);
  image(g4, 0, 0, SIZE, SIZE);
  // image(g1, 0, 0, SIZE, SIZE);
}
