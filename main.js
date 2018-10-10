var canvas;
var count =0;
var notoReg;
var notoItal;
var img =[];
var n = 0;
var slide;


var title = [ 
"Sacs a Ordures",
"Computer Drawing of a New Painting",
"XX_Flowers_XX",
"Gumdrops",
"Dark Square",
"Neves",
"Focus Holes",
"Excess",
"DGYHU",
"Oh Baby",
"Jacks"
];
var caption = [
"Plaster, tissue paper, ink",
"Plaster, paper towel, ink",
"Plaster, decorated napkin, oil paint",
"Plaster, paper towel, ink",
"Plaster, toilet paper, ink",
"Plaster, paper towel, ink",
"Plaster, decorated napkin, oil paint",
"Plaster, paper towel, ink",
"Plaster, toilet paper, ink",
"Plaster, decorated napkin, ink, oil paint",
"Plaster, tissue paper, acrylic paint, ink",
]

function preload(){
 img[0] = loadImage("assets/image0.jpg");
 notoReg = loadFont("NotoSans-Regular.ttf");
 notoItal = loadFont("NotoSans-Italic.ttf");
}

function setup() {

  canvas = createCanvas(windowWidth, windowHeight);
  slide = new Slide();
  	 	var tx = random(0,width-200);
	 	var ty = random(0,height-50);

  textSize(20);
  ellipseMode(CENTER);
  imageMode(CENTER);
  slide.resize();
  slide.display();
  slide.loadImg();
  slide.contact();
}

function draw(){
  count++;
}

function mouseMoved(){
  slide.display();
  slide.contact();
}

function keyPressed(){
				n++;
				if(n>=img.length){
					n=0
				}
				slide.resize();
				slide.display();
				slide.loadImg();
}

function mousePressed(){
	slide.click();
}

window.onresize = function(){
slide.resize();
slide.display();
}

//||||||||||||||||||||||||||||||||||||||||||||| main loop above

function Slide(){
	this.x;
	this.imgx;
	this.imgy;
	this.imgHeight;
	this.imgWidth;
	
	this.textSize;
	this.titlex;
	this.titley;
	
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
		canvas.size(windowWidth,windowHeight);
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
			canvas.size(windowWidth,height);
			this.textSize = 30;
			this.imgWidth = windowWidth;
			this.imgHeight = (this.imgWidth/img[n].width)*img[n].height;
			this.imgx = width/2;
			this.imgy = height*0.4;
			this.titlex = 30;
			this.titley = height*0.9;
// 			for(i=0;i<3;i++){
// 				panel[i].push(new Panel(i));
// 			}
			
			// canvas.size(this.imgWidth,this.imgHeight*1.5);
		}
	}
	
	this.click = function(){

			if(width<height){
				if(count>20){
					n++;
					if(n>=img.length){
						n=0
					}
					slide.resize();
					slide.display();
					slide.loadImg();
					count = 0;
					print(count);
				}
			}else if(width>height){
						if(count>20){
							n++;
							count = 0;
							if(n>=img.length){
								n=0
							}
							slide.resize();
							slide.display();
							slide.loadImg();
							slide.contact();
					   }
					}
	}
 	
	
	this.loadImg = function(){
		if(n<title.length-1 && img.length<title.length){
		 img[n+1] = loadImage("assets/image"+(n+1)+".jpg"); 
		 print("image"+(n+1)+" loaded");
		 }
		}
	
	this.contact = function(){
	    var xx = width-100;
	    var yy = 30;
	    var ww = 50;
	    var hh = 30;
	    var tx = width/2-200;
	 	var ty = height/2;
		push();
		fill(80);
		text("Contact",xx,yy);
		if(mouseX>xx&&mouseX<xx+ww&&mouseY>yy-20&&mouseY<yy+hh-20){
			noStroke();
			fill(200);
			text("Contact",xx,yy);
			fill(250,150,20);
			rect(tx-15,ty-30,500,90)
			fill(40);
			text("Matthis Grunsky is an artist from Halifax, Nova Scotia.",tx,ty);
			text("He currently lives in Vancouver, British Columbia.",tx,ty+20);
			text("Please contact at grunskm@gmail.com ",tx,ty+40);
			}
		pop()
	}
 }
