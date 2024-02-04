let s, img, noise;

function preload() {
  s = loadShader('shader.vert', 'shader.frag');
  noise = loadImage('perlin1024.png');
  img = loadImage('collage.gif');
}

function setup() {
  pixelDensity(1);
  createCanvas(img.width, img.height, WEBGL);
  noStroke();
}

function draw() {
  background(200);
  s.setUniform('u_resolution', [width, height]);
  s.setUniform('u_mouse', [mouseX, mouseY]);
  s.setUniform('u_time', millis()/1000.0);
  s.setUniform('u_tex', img);
  s.setUniform('u_noise', noise);
  shader(s);
  rect(0, 0, width, height);
}