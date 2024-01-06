let img, s, size;

function preload() {
  img = loadImage('hog.jpeg');
}

function setup() {
  let c = createCanvas(img.width, img.height, WEBGL);
  c.parent("container");
  background(0);
  let fragSrc = `
  precision highp float;

  varying vec2 vTexCoord;
  uniform sampler2D tex0;
  uniform vec2 texelSize;
  uniform vec2 canvasSize;
  
  void main() {
    vec4 color = texture2D(tex0, vTexCoord);
    color.b = 1.0;
    gl_FragColor = vec4(color.rgb, 1.0);
  }`;
  s = createFilterShader(fragSrc);
}

function draw() {
  image(img, -img.width/2, -img.height/2);
  filter(s);
}