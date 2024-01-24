const SIZE = 1024;

const TEXTSIZE = 43;

let color1;
let color2;
let font;
let ascent;
let coords = [];

function preload() {
  font = loadFont('inconsolata.ttf');
}

function setup() {
  createCanvas(SIZE, SIZE);
  textSize(TEXTSIZE);
  frameRate(60);
  textFont("Inconsolata");
  ascent = textAscent();
  color1 = color(0, 0, 0, 0);
  color2 = color(128, 64, 32, 255);

  // create a set of evenly vertically spaced coordinates along the left edge
  for (let i = 0; i < height + ascent; i += ascent) {
    coords.push({
      x: 10,
      y: i,
    });
  }
}

function draw() {
  background(240);
  let t = (frameCount / 88) % 1;
  // draw text at each coordinate in coords
  strokeWeight(1);
  for (let i = 0; i < coords.length; i++) {
    stroke(0, 0, 0, 222 - 16*abs((i + t) - coords.length/2));
    noFill();
    if (i == floor(coords.length / 2) - 1) {
      text(
        "every moment's a little bit later",
        coords[i].x + lerp(0, textWidth("later"), t * t * t * t * t),
        coords[i].y - ascent / 2 + lerp(0, ascent, t * t)
      );
    } else if (i == floor(coords.length / 2)) {
      stroke(lerpColor(color1, color2, t*t*t));
      fill(lerpColor(color2, color1, t*t*t));
      text(
        "every moment's a little bit later",
        coords[i].x + lerp(textWidth("later"), 0, t * t * t * t * t),
        coords[i].y - ascent / 2 + lerp(0, ascent, t * t)
      );
    } else {
      text(
        "every moment's a little bit later",
        coords[i].x,
        coords[i].y - ascent / 2 + lerp(0, ascent, t * t)
      );
    }
  }

  // draw three dots next to the middle line of text
  stroke(0);
  strokeWeight(6);
  let xDot = coords[floor(coords.length / 2) - 1].x + textWidth("every moment's a little bit later.....") + 10
  let yDot = coords[floor(coords.length / 2) - 1].y + ascent/2
  let cw = textWidth(".");
  point(
    xDot + lerp(0, cw, t * t * t * t * t),
    yDot
  );
  point(
    xDot + cw + lerp(0, cw, t * t * t * t * t),
    yDot
  );
  point(
    xDot + 2 * cw - lerp(0, 2*cw, t * t * t * t * t),
    yDot + bezierPoint(0, 25, 25, 0, t * t * t * t * t)
  );
}
