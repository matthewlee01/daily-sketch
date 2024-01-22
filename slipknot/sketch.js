const SIZE = 1024;

let xs = [];
let ys = [];

let xHead = 400;
let yHead = 400;
let xTail = xs[0];
let yTail = ys[0];
let xTip, yTip;

let step = 1;

function setup() {
  createCanvas(SIZE, SIZE);
  noFill();
  for (let i = 0; i < 32; i++) {
    xs.push(random(SIZE));
    ys.push(random(SIZE));
  }
}

function draw() {
  background(40, 100);
  strokeWeight(0.5);
  stroke(250);

  let xButt = curvePoint(xs[1], xs[0], xTail, xTip, 1 - step);
  let yButt = curvePoint(ys[1], ys[0], yTail, yTip, 1 - step);

  let xNeck = curvePoint(
    xs[xs.length - 2],
    xs[xs.length - 1],
    xHead,
    xHead,
    step
  );
  let yNeck = curvePoint(
    ys[ys.length - 2],
    ys[ys.length - 1],
    yHead,
    yHead,
    step
  );

  beginShape();
  curveVertex(xButt, yButt);
  curveVertex(xButt, yButt);
  curveVertex(xButt, yButt);
  for (let i = 0; i < xs.length; i++) {
    curveVertex(xs[i], ys[i]);
  }
  curveVertex(xNeck, yNeck);
  curveVertex(xNeck, yNeck);
  curveVertex(xNeck, yNeck);
  endShape();
  stroke(255);
  point(xNeck, yNeck);
  chase();
}

function chase() {
  for (let i = 0; i < xs.length - 1; i++) {
    if (step >= 1) {
      xTip = xTail;
      yTip = yTail;
      xTail = xs[0];
      yTail = ys[0];
      xs.shift();
      ys.shift();

      xs.push(xHead);
      ys.push(yHead);
      xHead = random(SIZE / 10, (9 * SIZE) / 10);
      yHead = random(SIZE / 10, (9 * SIZE) / 10);
      step = 0;
    } else {
      step += 0.005;
    }
  }
  // xs[xs.length-1] += (xs[xs.length-1] - mouseX)/drag
  // ys[ys.length-1] += (ys[ys.length-1] - mouseY)/drag
}
