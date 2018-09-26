var canvas;
var notoReg;
var notoItal;
var img =[];
var n = 0;
var slide1;
var title = [ 
"XX_Flowers_XX",
"Snake",
"Signature",
"Focus Holes",
"Computer Drawing of a New Painting",
"Sacs a Ordures"
];
var caption = [
"Plaster, decorated napkin, oil paint",
"Plaster, tissue paper, ink",
"Plaster, ink",
"Plaster, decorated napkin, oil paint",
"Plaster, paper towel, ink",
"Plaster, tissue paper, ink",
]

function preload(){
 notoReg = loadFont("NotoSans-Regular.ttf");
 notoItal = loadFont("NotoSans-Italic.ttf");
 
 for(i=0;i<6;i++){
 img[i] = loadImage("assets/image"+i+".png");
 }
 test = loadImage("assets/image0.png");

}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  slide1 = new Slide();
  slide1.resize();
  textSize(20);
  ellipseMode(CENTER);
  imageMode(CENTER);
  slide1.display();
}

function mouseMoved() {
slide1.resize();
slide1.display();
}

function mousePressed(){
				n++;
				if(n>=img.length){
					n=0
				}
				slide1.resize();
				slide1.display();
}

window.onresize = function(){
canvas.size(windowWidth,windowHeight);
slide1.resize();
slide1.display();
}

//||||||||||||||||||||||||||||||||||||||||||||| main loop above

function Slide(){
	this.x;
	this.acc;
	this.imgx;
	this.imgy;
	this.titlex;
	this.titley;
	this.captionx;
	this.captiony;
	this.imgHeight;
	this.imgWidth;
	this.move = 0;

	this.display = function(){
	
		background(240);
		
// 		if(this.move!=0){
// 			if(this.x<=this.imgx){
// 			}else if(this.x)
// 			this.move+= this.x;
// 			this.x -= this.move;
// 			
// 			if(this.imgx<-100){
// 				this.imgx = width;
// 				n++;
// 				if(n>=3){
// 					n=0
// 				}
// 			}
// 		}
		
		image(img[n],this.imgx,this.imgy,this.imgWidth,this.imgHeight);
		
		push();
			fill(30);
			textSize(25);
			text("Matthis Grunsky",this.titlex,this.titley-30);
			textSize(20);
			textFont(notoItal);
			text(title[n],this.titlex, this.titley);
			textFont(notoReg);
			text(caption[n],this.titlex,this.titley+30);
		pop();
	}

	this.resize = function(){

		if(width>600){
			this.imgHeight = 800;
			this.imgWidth = (this.imgHeight/img[n].height)*img[n].width;
			
			this.imgx = this.imgWidth/2+150;
			this.imgy = height/2;
			this.titlex = width-400;
			this.titley = height*0.9;
		}else{

			this.imgWidth = width;
			this.imgHeight = (this.imgWidth/img[n].width)*img[n].height;
			this.imgx = width/2;
			this.imgy = this.imgHeight/2+30;
			this.titlex = 30;
			this.titley = this.imgHeight+100;
			canvas.size(this.imgWidth,this.imgHeight*1.5);
		}
	}
	
// 	this.slide = function(){
// 		this.x += -10;		
// 	}
 }
