const SIZE = 1024;
const TILE_SIZE = 16;

let g1, g2, shader;
let oldX = SIZE/2, oldY = SIZE/2;
let nextX = SIZE/2, nextY = SIZE/2;
let x, y;

function preload() {
  shader = loadShader("shader.vert", "shader.frag");
}

function setup() {
  createCanvas(SIZE, SIZE);
  g1 = createGraphics(SIZE, SIZE, WEBGL);
  g2 = createGraphics(SIZE, SIZE, WEBGL);
}

function draw() {
  let t = (frameCount / 60) % 1;

  if (t == 0) {
    oldX = nextX;
    oldY = nextY;
    nextX = random(SIZE / 8, (7 * SIZE) / 8);
    nextY = random(SIZE / 8, (7 * SIZE) / 8);
  }
  x = lerp(oldX, nextX, 1 - pow(1 - t, 4));
  y = lerp(oldY, nextY, 1 - pow(1 - t, 4));

  g1.background(0, 50);
  g1.push();
  g1.stroke(255);
  g1.strokeWeight(1);
  g1.translate(-SIZE / 2, -SIZE / 2);
  g1.noFill();
  for (let i = SIZE / 4; i <= (3 * SIZE) / 4; i += TILE_SIZE) {
    g1.stroke(255);
    g1.bezier(
      g1.bezierPoint(
        SIZE / 4,
        SIZE / 4,
        SIZE / 4,
        (3 * SIZE) / 4,
        ((3 * SIZE) / 4 - i) / (SIZE / 2)
      ),
      g1.bezierPoint(
        SIZE / 4,
        y,
        y,
        SIZE / 4,
        ((3 * SIZE) / 4 - i) / (SIZE / 2)
      ),
      x,
      i,
      x,
      i,
      g1.bezierPoint(
        SIZE / 4,
        (3 * SIZE) / 4,
        (3 * SIZE) / 4,
        (3 * SIZE) / 4,
        ((3 * SIZE) / 4 - i) / (SIZE / 2)
      ),
      g1.bezierPoint(
        (3 * SIZE) / 4,
        y,
        y,
        (3 * SIZE) / 4,
        ((3 * SIZE) / 4 - i) / (SIZE / 2)
      )
    );
    g1.bezier(SIZE / 4, i, i, y, i, y, (3 * SIZE) / 4, i);
  }
  g1.line(SIZE / 4, SIZE / 4, SIZE / 4, (3 * SIZE) / 4);
  g1.line((3 * SIZE) / 4, SIZE / 4, (3 * SIZE) / 4, (3 * SIZE) / 4);
  g1.pop();

  g2.shader(shader);
  shader.setUniform("u_tex", g1);
  shader.setUniform("u_coords", [(x - SIZE/8)/(6*SIZE/8), (y - SIZE/8)/(6*SIZE/8)]);
  g2.background(0);
  g2.rect(0, 0, SIZE, SIZE);

  image(g2, 0, 0, SIZE, SIZE);
  // image(g1, 0, 0, SIZE, SIZE);
}
