// a shader variable
let theShader;

function preload(){
  // load the shader
  theShader = loadShader('basic.vert', 'basic.frag');

}

function setup() {
  pixelDensity(1);
  
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  }

function draw() {  
  
  theShader.setUniform('u_resolution', [width, height]);
  theShader.setUniform('u_time', frameCount);

  shader(theShader);

  // rect gives us some geometry on the screen
  rect(0,0,width, height);

}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}