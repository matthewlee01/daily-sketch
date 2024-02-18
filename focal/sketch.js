const SIZE = 512;

const count = 256;

let xs = [];
let ys = [];
let nxs = [];
let nys = [];

let fx = SIZE/2;
let nfx = SIZE/4;
let fy = SIZE/2;
let nfy = SIZE/4;

let t = 0;
let ft = 0;

let g = 255;
let b = 255;

function setup() {
  createCanvas(SIZE, SIZE);
  for(let i = 0; i < count; i++){
    xs.push(random(0, SIZE));
    ys.push(random(0, SIZE));
    nxs.push(random(0, SIZE));
    nys.push(random(0, SIZE));
  }
}

function draw() {
  background(42, 40);
  stroke(242);

  t += 0.005;
  ft += 0.007;

  if (t > 1) {
    t = 0;
    for(let i = 0; i < count; i++){
      xs[i] = nxs[i];
      ys[i] = nys[i];
      nxs[i] = random(0, SIZE);
      nys[i] = random(0, SIZE);
      g = random(0, 255);
      b = random(0, 255);
    }
  }

  if (ft > 1) {
    ft = 0;
    fx = nfx;
    fy = nfy;
    nfx = random(0, SIZE);
    nfy = random(0, SIZE);
  }

  let cfx = lerp(fx, nfx, ft);
  let cfy = lerp(fy, nfy, ft);

  for (let i = 0; i < count; i++) {
    let x = lerp(xs[i], nxs[i], t);
    let y = lerp(ys[i], nys[i], t);
    let d = dist(x, y, cfx, cfy);
    strokeWeight(24 * 1/d);
    stroke(777 * d/SIZE, g, b * SIZE/d);
    line(x, y, x+(cfx-x)/4, y+(cfy-y)/4);
  }
}
