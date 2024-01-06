let src, out;

let BAYER_MAP_0 = [
  [0, 2],
  [3, 1]
]

let BAYER_MAP_1 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

function preload() {
  src = loadImage("image.jpg");
}

function setup() {
  pixelDensity(1);
  noSmooth();
  let c = createCanvas(src.width, src.height);
  c.parent("container");

  out = createImage(src.width, src.height);
  out.loadPixels();
  src.loadPixels();

  for (let y = 0; y < src.height; y++) {
    for (let x = 0; x < src.width; x++) {
      let i = 4 * (x + src.width * y);
      let v = src.pixels[i] > 255*BAYER_MAP_1[x%4][y%4]/16.6 ? 255 : 0;
      out.pixels[i] = v;
      out.pixels[i + 1] = v;
      out.pixels[i + 2] = v;
      out.pixels[i + 3] = 255;
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