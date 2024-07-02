const cSize = 1024;
const dSize = 1024;
const fSkip = 3;
const useGPU = true;
const renderGPU = true;

let brushSize = 1;
let run = false;
let scale = cSize / dSize;

let d = [];
let dp = [];
let s, tex, buf;

function preload() {
  s = loadShader("shader.vert", "shader.frag");
  img1 = loadImage("perlin512.png");
}

function setup() {
  pixelDensity(1);
  createCanvas(cSize, cSize);
  noStroke();

  for (let i = 0; i < dSize * dSize; i++) {
    d.push(0);
    dp.push(1);
  }

  if (useGPU) {
    tex = createImage(dSize, dSize);
    tex.loadPixels();
    for (let i = 0; i < dSize * dSize; i++) {
      tex.pixels[i] = 0;
    }
    tex.updatePixels();
    buf = createGraphics(dSize, dSize, WEBGL);
  }
}

function draw() {
  background(0);

  if (run && frameCount % fSkip == 0) {
    swapArray();
    calcConway();
  }

  if (frameRate() < 30) {
    console.log(frameRate());
  }

  fill(255);
  if (renderGPU && useGPU && run) {
    image(tex, 0, 0, cSize, cSize);
  } else {
    for (let i = 0; i < dSize * dSize; i++) {
      drawSquare(i, d[i]);
    }
  }
}

function mouseDragged() {
  let x = floor(mouseX / scale);
  let y = floor(mouseY / scale);
  if (
    x - brushSize >= 0 &&
    x + brushSize < dSize &&
    y - brushSize >= 0 &&
    y + brushSize < dSize
  ) {
    for (let j = -brushSize; j <= brushSize; j++) {
      for (let k = -brushSize; k <= brushSize; k++) {
        if (random(1) > 0.5) {
          d[x + j + (y + k) * dSize] = 1;
        }
      }
    }
  }
}

function mousePressed() {
  let x = floor(mouseX / scale);
  let y = floor(mouseY / scale);
  if (x >= 0 && x < dSize && y >= 0 && y < dSize) {
    d[x + y * dSize] = 1 - d[x + y * dSize];
  }
}

function keyPressed() {
  if (key === " ") {
    run = !run;
    console.log(run);
  }

  if (key === ",") {
    console.log("back");
    swapArray();
  }
  if (key === ".") {
    console.log("step");
    swapArray();
    calcConway();
  }
  if (key === "f") {
    console.log(frameRate());
  }

  if (key === "n" && brushSize > 0) {
    brushSize--;
  }

  if (key === "m") {
    brushSize++;
  }
}

function calcConwayCPU() {
  for (let i = 0; i < dSize * dSize; i++) {
    let x = i % dSize;
    let y = floor(i / dSize);
    let n = 0;
    for (let j = -1; j < 2; j++) {
      for (let k = -1; k < 2; k++) {
        let x2 = x + j;
        let y2 = y + k;
        // wrap grid
        if (x2 < 0) {
          x2 = dSize - 1;
        }
        if (x2 >= dSize) {
          x2 = 0;
        }
        if (y2 < 0) {
          y2 = dSize - 1;
        }
        if (y2 >= dSize) {
          y2 = 0;
        }
        n += dp[x2 + y2 * dSize];
      }
    }
    n -= dp[x + y * dSize];
    d[x + y * dSize] = 0;
    if (dp[x + y * dSize] == 1 && n < 2) {
      d[x + y * dSize] = 0;
    } else if (dp[x + y * dSize] == 1 && n > 3) {
      d[x + y * dSize] = 0;
    } else if (dp[x + y * dSize] == 0 && n == 3) {
      d[x + y * dSize] = 1;
    } else {
      d[x + y * dSize] = dp[x + y * dSize];
    }
  }
}

function calcConwayGPU() {
  tex.loadPixels();
  for (let i = 0; i < dSize * dSize; i++) {
    tex.pixels[i * 4] = dp[i] * 255;
    tex.pixels[i * 4 + 1] = dp[i] * 255;
    tex.pixels[i * 4 + 2] = dp[i] * 255;
    tex.pixels[i * 4 + 3] = 255;
  }
  tex.updatePixels();

  buf.shader(s);
  s.setUniform("u_tex", tex);
  s.setUniform("u_resolution", [dSize, dSize]);
  buf.rect(0, 0, dSize, dSize);

  buf.loadPixels();
  for (let i = 0; i < dSize * dSize; i++) {
    d[i] = buf.pixels[i * 4] / 255;
  }
  buf.updatePixels();
}

function calcConway() {
  if (useGPU) {
    calcConwayGPU();
  } else {
    calcConwayCPU();
  }
}

function swapArray() {
  let temp = d;
  d = dp;
  dp = temp;
}

function drawSquare(i, v) {
  if (v == 1) {
    let x = i % dSize;
    let y = floor(i / dSize);
    rect(x * scale, y * scale, scale, scale);
  }
}
