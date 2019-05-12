var stage = 0;
var canvas;
var count = 0;

var mobileImgs = 9;
var mobileImg = [];

var notoReg;
var notoItal;

var mobile = false;
var fullSite = false;

var img = [
[ [],[],[],[]], //removed 'early work'
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

function loadMobileImg(){
	for(q=0;q<mobileImgs;q++){
		mobileImg[q] = loadImage("assets/mobile/mobileImage"+q+".jpg",mobileImgLoaded(q));
	}
}

function mobileImgLoaded(x){
	print("loaded image "+x);
	if(x>=8){
		stage = 1;
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
		fullSite = true;
		}
	if(img[0][0].length == title[0][0].length){
		stage = 1;
		resize();
	}
}

///Main Loop//////////////////////////////////

function setup() {
  frameRate(30);

  if(windowWidth<windowHeight){
	mobile = true;
  }else {mobile=false;}

  if(mobile==false){
  	canvas = createCanvas(windowWidth, windowHeight);
  	slide = new Slide();
  	navBar = new NavBar();
  	textSize(txtSize);
  	textFont(notoReg);
  	noStroke();
  	imageMode(CENTER);
  	fill(random(0,100),random(0,200),random(0,50));
  	loadImg();
  }else if(mobile==true){
    canvas = createCanvas(windowWidth, windowHeight);
  	slide = new Slide();
  	navBar = new NavBar();
  	textSize(txtSize);
    textFont(notoReg);
    noStroke();
    imageMode(CENTER);
    loadMobileImg();
    resize();
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
	}else if(mobile==true){	
		if(stage===0){
  		push();
  			textSize(20);
  			background(255);
  			text("LOADING",0,height/2);
  			text("PLEASE WAIT",0,height/2.5);
  		pop();
 		}else if(stage != 0){
			count++;
  			if(count<100){
  				slide.transition();
  				slide.display();
  				navBar.display();
  			}
 		}
 	  }
	}


///Interaction///////////////////////////////////

function mouseMoved(){
  if(frameCount>10 && stage==1 && mobile==false){
  	 slide.display();
 	 navBar.display();
  }
}

function touchEnded(){
	if(mobile==false && stage==1){
	slide.display();
    navBar.click();
	navBar.display();
	}
}

function keyPressed(){
  if(mobile==false && stage==1){
	if(keyCode==LEFT_ARROW){
		navBar.backButton.click();
	}else if(keyCode==RIGHT_ARROW){
		navBar.nextButton.click();
	}
  }
}

window.onresize = function(){
  if(mobile==false && stage==1){
	resize();
  }
}


