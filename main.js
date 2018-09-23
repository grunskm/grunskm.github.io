var canvas;
var notoReg;
var notoItal;
var image =[];
var n = 0;
var test;

function preload(){
 notoReg = loadFont("NotoSans-Regular.ttf");
 notoItal = loadFont("NotoSans-Italic.ttf");
 
 for(i=0;i<3;i++){
 image[i] = loadImage("assets/image"+i+".png");
 }
 test = loadImage("assets/image0.png");

}

function setup() {
  textFont(notoReg);
  textSize(40);
  canvas = createCanvas(windowWidth, windowHeight);
  ellipseMode(CENTER);
  imageMode(CENTER);
}

function draw() {
background(255);
fill(0);

image(image[n],width/2,height/2);
fill(255);
if(mouseX<width/2){
textFont(notoItal);
}else{textFont(notoReg);}
text("Website Coming Soon",mouseX, mouseY);
}

function mousePressed(){
n++;
if(n>=3){
n=0;
}
}

window.onresize = function(){
canvas.size(windowWidth,windowHeight);

}

function update(){

}