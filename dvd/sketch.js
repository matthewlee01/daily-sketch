// #0001 2024/01/01
// hey im really sleepy making this one so please
// leave me and my horrific magic numbers alone

let serif, sans;
let things;

let c;
let SIZE = 500;

function preload() {
  serif = loadFont("mondwest.otf");
  sans = loadFont("neuebit.otf");
}

function setup() {
  createCanvas(SIZE, SIZE);
  textAlign(LEFT, TOP);
  
  c = color(255, 255, 255);
  things = [
    {
      x: 200,
      y: 200,
      dx: 0.7,
      dy: -1.3,
      r: 240,
      g: 240,
      b: 240,
    },
  ];
}

function draw() {
  if (things.length % 4 !== 0) {
    background(0);
  }
  things.forEach((thing) => {
    updateThing(thing);
    drawThing(thing);
  });
}

function updateThing(thing) {
  textFont(serif);
  textSize(100);
  let { x, y, dx, dy } = thing;
  if (x + textWidth("2024") + dx > SIZE || x + dx < 0) {
    thing.dx = -dx;
    thing.r = random(255);
    if (random() < 0.2) {
      spawn(thing);
    }
  }
  if (y + textAscent() + 40 + dy > SIZE || y + dy < -16) {
    thing.dy = -dy;
    thing.g = random(255);
    thing.b = random(255);
    if (random() < 0.2) {
      spawn(thing);
    }
  }
  thing.x += thing.dx;
  thing.y += thing.dy;
}

function drawThing(thing) {
  c = color(thing.r, thing.g, thing.b);
  textFont(serif);
  textSize(100);
  fill(c);
  stroke(c);
  text("2024", thing.x - 4, thing.y);
  rect(thing.x, thing.y + textAscent(), textWidth("2024"), 40);
  textFont(sans);
  textSize(50);
  fill(color(thing.r - 20, thing.g - 20, thing.b - 20));
  text("N E W  &  ?", thing.x + 24, thing.y + 86);
}

function spawn(thing) {
  if (things.length < 96) {
    things.push({
      x: thing.x,
      y: thing.y,
      dx: thing.dx + random() - 0.5,
      dy: thing.dy + random() - 0.5,
      r: random(255),
      g: random(255),
      b: random(255),
    });
  }
}
