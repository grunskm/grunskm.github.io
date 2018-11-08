
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
		this.contact();
	}

	this.resize = function(){
		canvas.size(windowWidth,windowHeight);
		if(width>height){
			this.imgHeight = height*0.85;
			this.imgWidth = (this.imgHeight/img[n].height)*img[n].width;
			
			this.imgx = width*0.35;
			this.imgy = height/2;
			this.titlex = width*0.65;
			this.titley = height*0.9;
			if(width<900){
			this.textSize = 20;
			}else{this.textSize = 20;}
		}else{	
			canvas.size(windowWidth,height);
			this.textSize = 20;
			this.imgWidth = windowWidth;
			this.imgHeight = (this.imgWidth/img[n].width)*img[n].height;
			this.imgx = width/2;
			this.imgy = height*0.4;
			this.titlex = 30;
			this.titley = height*0.9;
		}
	}
	
	this.next = function(){

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
		this.back = function(){

			if(width<height){
				if(count>20){
					n--;
					if(n<0){
							n=img.length-1;
							}
					slide.resize();
					slide.display();
					slide.loadImg();
					count = 0;
					print(count);
				}
			}else if(width>height){
						if(count>20){
							n--;
							count = 0;
							if(n<0){
								n=img.length-1;
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
 

function backButt(x,y,w){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = w;
	this.buttFill = 0;
	this.textFill = 0;

	this.display = function(){
		push();
		ellipseMode(CORNER);
		
		if(mouseX>this.x && mouseX<this.x+this.w && mouseY>this.y && mouseY<this.y+this.h){
			this.buttFill = 70;
			this.line = 255;
		}else{
			this.buttFill = 240;
			this.line = 50;
			}
		noStroke();
		fill(this.buttFill,100);
		ellipse(this.x,this.y,this.w);
		stroke(this.line);
		line(this.x+this.w*0.7,this.y+this.w*0.25,this.x+this.w*0.25,this.y+this.w/2);
		line(this.x+this.w*0.25,this.y+this.w/2,this.x+this.w*0.7,this.y+this.w*0.75);
		pop();
	}
	this.click = function(){
		if(mouseX>this.x && mouseX<this.x+this.w && mouseY>this.y && mouseY<this.y+this.h){
			slide.back();
			print("BACK");
		}
	}
}

function nextButt(x,y,w){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = w;
	this.buttFill;
	this.textFill;

	this.display = function(){
		push();
		ellipseMode(CORNER);
		if(mouseX>this.x && mouseX<this.x+this.w && mouseY>this.y && mouseY<this.y+this.h){
			this.buttFill = 70;
			this.line = 255;
		}else{
			this.buttFill = 240;
			this.line = 50;
			}
		noStroke();
		fill(this.buttFill,100);
		ellipse(this.x,this.y,this.w);
		stroke(this.line);
		line(this.x+this.w*0.3,this.y+this.w*0.25,this.x+this.w*0.75,this.y+this.w/2);
		line(this.x+this.w*0.75,this.y+this.w/2,this.x+this.w*0.3,this.y+this.w*0.75);
		pop();
	}
	this.click = function(){
		if(mouseX>this.x && mouseX<this.x+this.w && mouseY>this.y && mouseY<this.y+this.h){
			slide.next();
			print("NEXT");	
		}
	}
}

function resize(){
if(width<height){
slide.resize();
slide.display();
backButton = new backButt(width*0.1,height*0.7,width*0.2);
nextButton = new nextButt(width*0.7,height*0.7,width*0.2);
backButton.display();
nextButton.display();
}
if(width>height){
slide.resize();
slide.display();
backButton = new backButt(width*0.64,height*0.7,width*0.05);
nextButton = new nextButt(width*0.74,height*0.7,width*0.05);
backButton.display();
nextButton.display();
}
}