const SIZE = 512;

let scaling = 0.6;
let weight = 1;
let gap = 42;
let border = 22;

let bgc = 0;
let fgc = 255;

function setup() {
  createCanvas(SIZE, SIZE);
}

function draw() {
  background(bgc);
  stroke(fgc);
  fill(bgc);
  scale(scaling);
  planA(border, border);
  sectionB(border, border + 11.5 + 331 + 15.5 + gap);
  sectionC(border + 13.5 + 392 + 15.5 + gap, border + 11.5 + 331 + 15.5 + gap);
  reflectionLine();
}

function planA(x, y) {
  push();
  translate(x, y);
  strokeWeight(weight);

  // outline
  rect(-13.5, -11.5, 13.5 + 392 + 15.5, 11.5 + 331 + 15.5);

  // inline
  rect(0, 0, 392, 331);

  // entrance
  rect(152.5, 0, 7, 1);
  rect(152.5 + 71.5 + 7, 0, 7, 1);
  rect(152.5 + 7, weight, 3.5, 71.5);
  stroke(bgc);
  line(152.5 + 7, 0, 152.5 + 7 + 71.5, 0);
  line(152.5 + 7, -11.5, 152.5 + 7 + 71.5, -11.5);
  stroke(fgc);
  line(152.5 + 7, 0, 152.5 + 7, -11.5);
  line(152.5 + 7 + 71.5, 0, 152.5 + 7 + 71.5, -11.5);

  // closet
  rect(0, 49.5, 2, 13);
  rect(0, 49.5 + 64.5 + 13, 2, 13);
  rect(weight, 49.5 + 13, 64.5, 3.5);
  stroke(bgc);
  line(0, 49.5 + 13, 0, 49.5 + 13 + 64.5);
  line(-13.5, 49.5 + 13, -13.5, 49.5 + 13 + 64.5);
  stroke(fgc);
  line(0, 49.5 + 13, -13.5, 49.5 + 13);
  line(0, 49.5 + 13 + 64.5, -13.5, 49.5 + 13 + 64.5);

  // patio
  rect(392 - 2, 0, 2, 10);
  rect(392 - 2, 10 + 77, 2, 13);
  rect(392 - 77 - weight, 10, 77, 3.5);
  stroke(bgc);
  line(392, 10, 392, 10 + 77);
  line(392 + 15.5, 10, 392 + 15.5, 77 + 10);
  stroke(fgc);
  line(392, 10, 392 + 15.5, 10);
  line(392, 10 + 77, 392 + 15.5, 10 + 77);
  pop();
}

function sectionB(x, y) {
  push();
  translate(x, y);
  strokeWeight(weight);

  // outline
  rect(-13.5, 0, 13.5 + 392 + 15.5, 243.5);
  line(0, 0, 0, 243.5);
  line(392, 0, 392, 243.5);

  strokeWeight(weight / 2);
  // door
  rect(152.5, 30.5, 71.5 + 7 + 7, 205 + 8);
  rect(152.5 + 7, 30.5 + 8, 71.5, 205);

  pop();
}

function sectionC(x, y) {
  push();
  translate(x, y);
  strokeWeight(weight);

  // outline
  rect(-11.5, 0, 11.5 + 331 + 15.5, 243.5);
  line(0, 0, 0, 243.5);
  line(331, 0, 331, 243.5);

  strokeWeight(weight / 2);
  // door
  rect(0, 22.5, 23 + 77, 201 + 20);
  rect(10, 22.5 + 20, 77, 201);

  // 

  pop();
}

function reflectionLine() {
  push();
  stroke(fgc);
  translate(
    border + 13.5 + 392 + 15.5 - 11.5 + gap / 2,
    border + 11.5 + 331 + 15.5 + gap / 2
  );
  rotate(- 3 * PI / 4);
  line(0, 0, 0, 666);
  pop();
}
