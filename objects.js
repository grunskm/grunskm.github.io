
function NavBar(){
	this.h = 35;
	this.x = 0;
	this.y = height-this.h;
	this.spacing = 150;
	this.about
	this.link = [];
	this.linkName = [
		"Painting",
		"Plaster",
		"Exhibitions",
		"Matthis Grunsky"
		];
		

	this.link[0] = new Link(0,this.linkName[0],150,150);
	this.link[1] = new Link(1,this.linkName[1],150,300);
	this.link[2] = new Link(2,this.linkName[2],150,450);
	this.link[3] = new Link(3,this.linkName[3],150,width-150);

	
	this.display = function(){
		push();
		noStroke();
		fill(10);
		rect(this.x,this.y,width,height);
		textSize(15);
		fill(150);
		textFont(notoReg);
		for(e=0;e<this.link.length;e++){
			this.link[e].display(e);
			this.link[e].hover(e);
		}
		pop();
	}
	
	this.click = function(){
		for(e=0;e<this.link.length;e++){
			this.link[e].click(e);
		}
	}
	
	this.resize = function(){
		this.y = height-this.h;
		for(e=0;e<this.link.length;e++){
			this.link[e].resize();
		}
	}

	
	function Link(number,title,spacing,x){
		this.h = 35;
		this.text = title;
		this.spacing = spacing;
		this.x = x;
		this.y = height-10;

		
		this.display = function(p){
			text(this.text,this.x,this.y);
			push();
			stroke(50);
			//line(this.x-10,height-this.h,this.x-20,height);
			noStroke();
			//fill(15,15,15);
			fill(240);
			if(page==p){
				beginShape();
				vertex(this.x-15,height); //bottom left
				vertex(this.x-20,height-this.h+10);
				vertex(this.x-30,height-this.h-3);//top left
				vertex(this.x+this.spacing-8,height-this.h-3);//top right
				vertex(this.x+this.spacing-20,height-this.h+10);
				vertex(this.x+this.spacing-26,height);//bottom right
				endShape();
				
				fill(15);
				text(this.text,this.x,this.y);
				
				fill(10);
				ellipse(this.x+this.spacing-9,height-this.h+10,20);
				ellipse(this.x-31,height-this.h+10,20);
			}
			pop();
// 					if(page==p){
// 				beginShape();
// 				vertex(this.x-25,height-this.h-3);
// 				vertex(this.x+this.spacing-15,height-this.h-3);
// 				vertex(this.x+this.spacing-25,height);
// 				vertex(this.x-15,height);
// 				endShape();
// 				fill(15,15,15);
// 				text(this.text,this.x,this.y);
			
		}
		
		this.hover = function(p){
			if(this.x<mouseX && mouseX<this.x+this.spacing && height-40<mouseY && p!=page){
				push();
				fill(250,250,200);
				noStroke();
				text(this.text,this.x,this.y);
				pop();
			}
		}
		
		this.click = function(p){
			if(this.x<mouseX && mouseX<this.x+this.spacing && height-40<mouseY&& p!=page){
				slide.pageTrans(p);
			}
		}
		
		this.resize = function(){
			this.y = height-10;
		}
	}
}

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
	
	this.trans = 255;
	this.transSpeed = 0;
	this.n = n;
	this.page = page;

	this.display = function(){
	
		background(240);
		
		image(img[this.page][this.n],this.imgx,this.imgy,this.imgWidth,this.imgHeight);
		background(240,255-this.trans);
		
		push();
			fill(30);
			textSize(this.textSize);
			text(dimension[page][n],this.titlex,this.titley+60);
			text(yyyy[page][n],this.titlex,this.titley+90);
			textSize(this.textSize);
			textFont(notoItal);
			text(title[page][n],this.titlex, this.titley);
			textFont(notoReg);
			text(caption[page][n],this.titlex,this.titley+30);
		pop();
	}

	this.resize = function(){
		canvas.size(windowWidth,windowHeight);
		if(width>height){
			this.imgHeight = height*0.85;
			this.imgWidth = (this.imgHeight/img[page][n].height)*img[page][n].width;
			
			this.imgx = width*0.35;
			this.imgy = height*0.45;
			this.titlex = width*0.65;
			this.titley = height*0.2;
			if(width<900){
			this.textSize = 20;
			}else{this.textSize = 20;}
		}else{	
			canvas.size(windowWidth,height);
			this.textSize = 15;
			this.imgWidth = windowWidth;
			this.imgHeight = (this.imgWidth/img[page][n].width)*img[page][n].height;
			this.imgx = width/2;
			this.imgy = height*0.4;
			this.titlex = 30;
			this.titley = height*0.2;
		}
	}
	
	this.transition = function(){
		if(width>height){
			this.trans+=this.transSpeed;	
			if(this.trans>=255){
				this.transSpeed = 0;
				this.trans = 255;
			}else if(this.trans<=0){
				this.transSpeed*=-1;
				this.n = n;
				this.page = page;
				resize();
			}
		}else{
			this.n = n;
			resize();
		}
	}
	
	
	this.next = function(){

			if(width<height){
				if(count>5){
					this.transSpeed = -20;
					n++;
					if(n>=img[page].length){
						n=0
					}
					//slide.resize();
					slide.display();
					count = 0;
					print(count);
				}
			}else if(width>height){
						if(count>5){
							this.transSpeed = -20;
							n++;
							count = 0;
							if(n>=img[page].length){
								n=0
							}
							//slide.resize();
							slide.display();
					   }
					}
	}

	this.back = function(){

			if(width<height){
				if(count>20){
					this.transSpeed = -30;
					n--;
					if(n<0){
							n=img[page].length-1;
							}
					//slide.resize();
					slide.display();
					count = 0;
					print(count);
				}
			}else if(width>height){
						if(count>20){
							this.transSpeed = -30;
							n--;
							count = 0;
							if(n<0){
								n=img[page].length-1;
							}
							//slide.resize();
							slide.display();
					   }
					}
	}
	
	this.pageTrans = function(k){
		if(width>height){
			if(count>5){
				this.transSpeed = -20;
				page = k;
				n = 0;
				count = 0;
				//slide.resize();
				slide.display();
			}
		}
	}
 }
 
function exLink(x,y,t,ts,a){
		this.x = x;
		this.y = y;
		this.text = t;
		this.textfill = 50;
		this.w = this.text.length*ts; // link to relative text size??
		this.textsize = ts;
		this.h = ts;
		this.address = a;
		this.display = function(){
			if(mouseX>this.x && mouseX<this.x+this.w && mouseY>this.y && mouseY<this.y+this.h){
				this.textfill = 150;
			}else{this.textfill = 90;}
			fill(this.textfill);
			textSize(this.textsize);
			text(this.text,this.x,this.y+this.textsize);
		}
		this.click = function(){
			if(mouseX>this.x && mouseX<this.x+this.w && mouseY>this.y && mouseY<this.y+this.h){
				//insert link function here!
			}
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
		if(title[page].length>1){
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
	if(title[page].length>1){
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
////PortraitMode
slide.resize();
slide.display();
backButton = new backButt(width*0.1,height*0.7,width*0.2);
nextButton = new nextButt(width*0.7,height*0.7,width*0.2);
backButton.display();
nextButton.display();
navBar.resize();
navBar.display();
}

if(width>height){
//LandscapeMode
slide.resize();
slide.display();
backButton = new backButt(width*0.64,height*0.4,width*0.05);
nextButton = new nextButt(width*0.74,height*0.4,width*0.05);
backButton.display();
nextButton.display();
navBar.resize();
navBar.display();
}
}