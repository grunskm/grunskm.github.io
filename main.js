var currentPage;
var homeImg = [];
var fluffImg = [];
var ghostImg = [];
var ghostWall;
var pageCount = 8;
var pageName;
var canvas;
var count = 0;
var lines;


// function preload(){
//   //load all relevent images
//   lines = loadStrings('assets/text.txt'); 
//   for(i=0;i<8;i++){
//   	homeImg.push(loadImage("assets/homeImg/homeImg"+i+".png"));
//   }
//   
//   for(i=0;i<10;i++){
//    fluffImg.push(loadImage("assets/fluffs/fluff"+i+".jpg"));
//   }
//   
//   for(i=0;i<2;i++){
//   ghostImg.push(loadImage("assets/ghosts/ghost"+i+".png"));
//   }
//   
//   ghostWall = loadImage("assets/ghosts/wall.png");
// }

function setup() {
noStroke();
canvas = createCanvas(windowWidth,windowHeight);
currentPage = new HoldingPage();
//currentPage = new HomePage();
// currentPage.resize();
// currentPage.display();
}

function draw(){
// 	if(count>0){
// 		count++;
// 		currentPage.display();
// 	}
// 	if(count>50){
// 		count = 0;
// 	}
}

function mouseMoved() {
count = 1;
if(currentPage!=undefined){
	currentPage.display();
 }
}

function mousePressed(){
currentPage.click();
currentPage.display();
}

function keyPressed(){
currentPage.click();
currentPage.display();
}

window.onresize = function(){
currentPage.resize();
currentPage.display();
//print("resize");
}