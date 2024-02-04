let src, out;

let BAYER_MAP_0 = [
  [0, 2],
  [3, 1],
];

let BAYER_MAP_1 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

let rs = [242, 215, 26];
let gs = [211, 133, 26];
let bs = [152, 33, 26];

function preload() {
  src = loadImage("collage.gif");
}

function setup() {
  pixelDensity(1);
  noSmooth();
  let c = createCanvas(src.width, src.height);
  c.parent("container");

  out = createImage(src.width, src.height);
}

function draw() {
  background(10, 10);
  let t = floor(millis() / 42);
  out.loadPixels();
  src.loadPixels();
  for (let y = 0; y < src.height; y++) {
    for (let x = 0; x < src.width; x++) {
      let i = 4 * (x + src.width * y);
      let xx = x;
      let yy = y;
        xx = abs(x-t);
        yy = y + t;
      let threshold = (255 * (1 - (BAYER_MAP_1[x % 4][y % 4]) / 20)) + 4*sin(16*cos(millis()/666));
      if (src.pixels[i] > threshold*3/2) {
        out.pixels[i] = rs[0];
        out.pixels[i + 1] = gs[0];
        out.pixels[i + 2] = bs[0];
        out.pixels[i + 3] = 255;
      } else if (src.pixels[i] > threshold) {
        out.pixels[i] = rs[1];
        out.pixels[i + 1] = gs[1];
        out.pixels[i + 2] = bs[1];
        out.pixels[i + 3] = 255; 
      } else {
        out.pixels[i] = rs[2];
        out.pixels[i + 1] = gs[2];
        out.pixels[i + 2] = bs[2];
        out.pixels[i + 3] = 255;
      }
    }
  }
  out.updatePixels();
  image(out, 0, 0);
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    saveCanvas();
  }
}
