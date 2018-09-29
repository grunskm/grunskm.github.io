var canvas;
var notoReg;
var notoItal;
var img =[];
var n = 0;
var slide1;
var title = [ 
"Sacs a Ordures",
"Computer Drawing of a New Painting",
"XX_Flowers_XX",
"Gumdrops",
"Dark Square",
"Neves",
"Focus Holes"
];
var caption = [
"Plaster, tissue paper, ink",
"Plaster, paper towel, ink",
"Plaster, decorated napkin, oil paint",
"Plaster, paper towel, ink",
"Plaster, toilet paper, ink",
"Plaster, paper towel, ink",
"Plaster, decorated napkin, oil paint"
]

function preload(){
    img[0] = loadImage("assets/image0.jpg");
 notoReg = loadFont("NotoSans-Regular.ttf");
 notoItal = loadFont("NotoSans-Italic.ttf");
 
//  for(i=0;i<6;i++){
//  img[i] = loadImage("assets/image"+i+".png");
//  }
  //img[1] = loadImage("assets/image1.png");

}

function setup() {

  canvas = createCanvas(windowWidth, windowHeight);
  slide1 = new Slide();

  textSize(20);
  ellipseMode(CENTER);
  imageMode(CENTER);
  slide1.resize();
  slide1.display();
  slide1.loadImg();
}

function mouseMoved() {
	if(frameCount>10){
		slide1.display();
	}
}

function keyPressed(){
				n++;
				if(n>=img.length){
					n=0
				}
				canvas.size(windowWidth,windowHeight);
				slide1.resize();
				slide1.display();
				slide1.loadImg();
}

function mousePressed(){
	if(width>height){
				n++;
				if(n>=img.length){
					n=0
				}
				canvas.size(windowWidth,windowHeight);
				slide1.resize();
				slide1.display();
				slide1.loadImg();
		}
}

function touchEnded(){
	slide1.touch();
}

window.onresize = function(){
canvas.size(windowWidth,windowHeight);
slide1.resize();
slide1.display();
}

//||||||||||||||||||||||||||||||||||||||||||||| main loop above

function Slide(){
	this.x;
	this.textSize;
	this.imgx;
	this.imgy;
	this.titlex;
	this.titley;
	this.captionx;
	this.captiony;
	this.imgHeight;
	this.imgWidth;
	this.move = 0;
	
	this.hold = 0;

	this.display = function(){
	
		background(240);
		
		image(img[n],this.imgx,this.imgy,this.imgWidth,this.imgHeight);
		
		push();
			fill(30);
			textSize(this.textSize);
			text("Matthis Grunsky",this.titlex,this.titley-30);
			textSize(this.textSize);
			textFont(notoItal);
			text(title[n],this.titlex, this.titley);
			textFont(notoReg);
			text(caption[n],this.titlex,this.titley+30);
		pop();
	}

	this.resize = function(){

		if(width>height){
			this.imgHeight = height*0.85;
			this.imgWidth = (this.imgHeight/img[n].height)*img[n].width;
			
			this.imgx = width*0.35;
			this.imgy = height/2;
			this.titlex = width-400;
			this.titley = height*0.9;
			if(width<900){
			this.textSize = 15;
			}else{this.textSize = 20;}
		}else{
			this.textSize = 30;
			this.imgWidth = width;
			this.imgHeight = (this.imgWidth/img[n].width)*img[n].height;
			this.imgx = width/2;
			this.imgy = this.imgHeight/2+30;
			this.titlex = 30;
			this.titley = this.imgHeight+150;
			canvas.size(this.imgWidth,this.imgHeight*1.5);
		}
	}
	this.touch = function(){
			if(width<height){
				if(frameCount>200){
					n++;
					if(n>=img.length){
						n=0
					}
					slide1.resize();
					slide1.display();
					slide1.loadImg();
					frameCount = 0;
				}
			} 	
	}
	
	this.loadImg = function(){
		if(n<title.length-1 && img.length<title.length){
		 img[n+1] = loadImage("assets/image"+(n+1)+".jpg"); 
		 print("image"+(n+1)+" loaded");
		}
	}
 }
