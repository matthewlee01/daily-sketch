let s, img;

function preload() {
  s = loadShader('shader.vert', 'shader.frag');
  img = loadImage('perlin1000.png');
}

function setup() {
  pixelDensity(1);
  createCanvas(1024, 1024, WEBGL);
  noStroke();
}

function draw() {
  background(255);
  s.setUniform('u_resolution', [width, height]);
  s.setUniform('u_mouse', [mouseX, mouseY]);
  s.setUniform('u_time', millis()/1000.0);
  s.setUniform('u_tex', img);
  shader(s);
  rect(0, 0, width, height);
}