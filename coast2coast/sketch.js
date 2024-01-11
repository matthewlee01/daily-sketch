const SIZE = 200;
let gridMain = [];
let gridA = [];
let gridB = [];
let queueA = [];
let queueB = [];
let scale;
let SPEED = 128;
let depth;

function setup() {
  depth = 0;
  createCanvas(500, 500);
  scale = width / SIZE;
  noStroke();
  for (let i = 0; i < SIZE; i++) {
    let rowMain = [];
    let rowA = [];
    let rowB = [];
    for (let j = 0; j < SIZE; j++) {
      height = random(64);
      let top = i == 0;
      let left = j == 0;
      let bot = i == SIZE - 1;
      let right = j == SIZE - 1;
      rowA.push(top || left);
      rowB.push(bot || right);
      if (top || left) {
        queueA.push([i, j]);
        height += 100;
      }
      if (right || bot) {
        queueB.push([i, j]);
        height += 100;
      }
      rowMain.push(height);
    }
    gridMain.push(rowMain);
    gridA.push(rowA);
    gridB.push(rowB);
  }
}

function draw() {
  background(220);
  drawGrid();
  for (let i = 0; i < SPEED; i++) {
    percolate(gridA, queueA);
    percolate(gridB, queueB);
  }
}

function drawGrid() {
  for (let i = 0; i < gridMain.length; i++) {
    for (let j = 0; j < gridMain[0].length; j++) {
      let height = gridMain[i][j];
      let r = height+150;
      let g = height;
      let b = height;
      if (gridA[i][j]) {
        r += 75;
        g += 155
        b += 95;
      }
      if (gridB[i][j]) {
        r += 55
        g += 135;
        b += 105;
      }
      fill(r, g, b);
      square(j * scale, i * scale, scale);
    }
  }
}

function mousePressed() {
  percolate(gridA, queueA);
  let x = floor(mouseX/scale);
  let y = floor(mouseY/scale);
  console.log(y + ','+x, gridMain[y][x]);
}

function percolate(grid, queue) {
  if (queue.length <= 0) return;
  let i = floor(random(queue.length));
  let [x, y] = queue[i];
  queue.splice(i, 1);
  console.log(x, y);
  grid[x][y] = true;
  let ns = neighbours(x, y, grid);
  for (let n of ns) {
    queue.push(n);
  }
}

function neighbours(x, y) {
  let ns = [];
  depth++;
  let height = gridMain[x][y] * (0.54 + log(depth * 0.0016));
  if (x > 0 && gridMain[x - 1][y] <= height && !gridA[x-1][y] && !gridB[x-1][y]) {
    ns.push([x - 1, y]);
  }
  if (y > 0 && gridMain[x][y - 1] <= height && !gridA[x][y-1] && !gridB[x][y-1]) {
    ns.push([x, y - 1]);
  }
  if (x < SIZE - 1 && gridMain[x + 1][y] <= height && !gridA[x+1][y] && !gridB[x+1][y]) {
    ns.push([x + 1, y]);
  }
  if (y < SIZE - 1 && gridMain[x][y + 1] <= height && !gridA[x][y+1] && !gridB[x][y+1]) {
    ns.push([x, y + 1]);
  }
  return ns;
}
