let s, img, noise;

function preload() {
  s = loadShader('shader.vert', 'shader.frag');
  img = loadImage('face.jpeg');
  noise = loadImage('perlin512.png');
}

function setup() {
  pixelDensity(1);
  createCanvas(512, 512, WEBGL);
  noStroke();
}

function draw() {
  background(255);
  s.setUniform('u_resolution', [width, height]);
  s.setUniform('u_mouse', [mouseX, mouseY]);
  s.setUniform('u_time', millis()/1000.0 - 4);
  s.setUniform('u_tex', img);
  s.setUniform('u_noise', noise);
  shader(s);
  rect(0, 0, width, height);
}