
const SIZE = 512;

const SHRINK = 1.6;
let ANGLE;
let x;

function setup() {
  createCanvas(SIZE, SIZE);
  ANGLE = PI/5.1;
  background(42);
}

function draw() {

  background(50, 20, 20, 40);
  x = sin(millis()/1200);
  let l = x*77 + 88;
  
  translate(width/2, 0);
  branch(-l);
}

function branch(l) {
  stroke(
    x*88 + 144,
    22,
    22
  );
  strokeWeight(2);
  line(0, 0, 0, -l);
  if (abs(l) > 1) {
    translate(0, -l);
    push();
    rotate(ANGLE + x/4);
    branch(l/(SHRINK));
    pop();
    rotate(-ANGLE - x/4);
    branch(l/(SHRINK));
  }

}