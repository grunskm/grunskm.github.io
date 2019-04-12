var stage = 0;
var canvas;
var count =0;

var notoReg;
var notoItal;

var mobile = false;

var img = [
[ [],[],[],[] ],
[ [],[],[] ],
[ [],[],[],[] ],
[ [] ]
];

var nPage = 0;
var nGroup = 0;
var nSlide = 0;

var page = 0;
var group = 0;
var n = 0;

var slide;
var navBar;

var txtSize = 15;


//////////Image Loading//////////////////////////////

function preload(){
 notoReg = loadFont("RobotoMono-Regular.ttf");
 notoItal = loadFont("RobotoMono-Italic.ttf");
}

function loadImg(){
	if(nPage<title.length){
	img[nPage][nGroup][nSlide] = loadImage("assets/image"+nPage+"_"+nGroup+"_"+nSlide+".jpg",imgLoaded);
	}
}

function imgLoaded(){
	print("image "+nPage+"_"+nGroup+"_"+nSlide+" loaded");
	text("image"+nPage+"_"+nGroup+"_"+nSlide+" loaded",(50+nGroup*200)+(nPage*50),(50+30*nSlide)+(nPage*50));
	
	if(nSlide+1<title[nPage][nGroup].length){
		nSlide++;
		loadImg();
	}else if(nGroup+1<title[nPage].length){
		nGroup++;
		nSlide = 0;
		loadImg();
	}else if(nPage+1<title.length){
		//background(240);
		fill(random(0,255),random(0,255),random(0,255));
 		nPage++;
 		nGroup = 0;
 		nSlide = 0;
 		loadImg();
	}else{
		print("All Done!");
		resize();
		stage = 1;
		}
}

///Main Loop//////////////////////////////////

function setup() {
  frameRate(30);
  canvas = createCanvas(windowWidth, windowHeight);
  if(width<height){
	mobile = true;
  }else if(width>height){mobile=false;}

  if(mobile==false){
  slide = new Slide();
  navBar = new NavBar();
  textSize(txtSize);
  textFont(notoReg);
  noStroke();
  noFill();
  imageMode(CENTER);
  loadImg();
  }
}

function draw(){
	if(mobile==false){
 		if(stage===0){
  		push();
  		textSize(50);
  		translate(width*0.25,0);
  		//fill(50,50,10);
  		text("LOADING - PLEASE WAIT",-width*0.25 +50,height-50);
  		pop();
		//fill(0,200,200);
		ellipse(mouseX,mouseY,40);
 		}else if(stage != 0){
  			count++;
  			if(count<100){
  				slide.transition();
  				slide.display();
  				navBar.display();
  			}
  		}
	}else{	
	push();
	background(0)
	textSize(txtSize);
    textFont(notoReg);
	noStroke();
	fill(200);
	text("MOBILE WEBSITE UNDER CONSTRUCTION",50,height*0.25);
	text("PLEASE REVISIT ON DESKTOP COMPUTER",50,(height*0.25)+(txtSize*2));
	pop();
	}
}

function mouseMoved(){
  if(frameCount>10 && stage==1 && mobile==false){
  	 slide.display();
 	 navBar.display();
  }
}

function touchEnded(){
	if(mobile==false){
	slide.display();
    navBar.click();
	navBar.display();
	}
}

function keyPressed(){
	if(keyCode==LEFT_ARROW){
		navBar.backButton.click();
	}else if(keyCode==RIGHT_ARROW){
		navBar.nextButton.click();
	}
}

window.onresize = function(){
resize();
}


