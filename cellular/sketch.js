let s, img;

let xs = [];
let ys = [];
let dxs = [];
let dys = [];
let ndxs = [];
let ndys = [];
let t = 0;

function preload() {
  s = loadShader('shader.vert', 'shader.frag');
}

function setup() {
  pixelDensity(1);
  createCanvas(1024, 1024, WEBGL);
  noStroke();
  for (let i = 0; i < 8; i++) {
    xs.push(random());
    ys.push(random());
    dxs.push(random(-0.01, 0.01));
    dys.push(random(-0.01, 0.01));
    ndxs.push(random(-0.01, 0.01));
    ndys.push(random(-0.01, 0.01));
  }
}

function draw() {
  background(255, 10);
  s.setUniform('u_resolution', [width, height]);
  s.setUniform('u_mouse', [mouseX, mouseY]);
  s.setUniform('u_time', millis()/1000.0);
  s.setUniform('u_tex', img);
  s.setUniform('u_p0', [xs[0], ys[0]]);
  s.setUniform('u_p1', [xs[1], ys[1]]);
  s.setUniform('u_p2', [xs[2], ys[2]]);
  s.setUniform('u_p3', [xs[3], ys[3]]);
  s.setUniform('u_p4', [xs[4], ys[4]]);
  s.setUniform('u_p5', [xs[5], ys[5]]);
  s.setUniform('u_p6', [xs[6], ys[6]]);
  s.setUniform('u_p7', [xs[7], ys[7]]);

  updatePoints();


  shader(s);
  rect(0, 0, width, height);
}

function updatePoints() {
  t += 0.01;
  if (t > 1) {
    t = 0;
    for (let i = 0; i < 8; i++) {
      dxs[i] = ndxs[i];
      dys[i] = ndys[i];
      ndxs[i] = random(-0.01, 0.01);
      ndys[i] = random(-0.01, 0.01);
    }
  }
  for (let i = 0; i < 8; i++) {
    let dx = lerp(dxs[i], ndxs[i], t);
    let dy = lerp(dys[i], ndys[i], t);
    // movement and collision
    xs[i] += dx;
    ys[i] += dy;
    if (xs[i] < 0 || xs[i] > 1) {
      dxs[i] *= -1;
      ndxs[i] *= -1;
    }
    if (ys[i] < 0 || ys[i] > 1) {
      dys[i] *= -1;
      ndys[i] *= -1;
    }

  }
}