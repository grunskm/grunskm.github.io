
function NavBar(){
	this.h;
	this.y;
	this.w;
	this.spacing;
	this.fill;
	this.about
	this.link = [];
	this.linkName = [
		"Painting",
		"Plaster",
		"Installation",
		"Matthis Grunsky"
		];
	
	this.display = function(){
		push();
		noStroke();
		fill(this.fill);
		rect(0,this.y,width,height);
		textSize(15);
		fill(150);
		textFont(notoReg);
		for(e=0;e<this.link.length;e++){
			this.link[e].display(e,this.h);
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

		if(mobile==false){
			this.h = 35;
			this.y = height-this.h;
			this.w = width;
			this.spacing = 150;
			this.fill = 15;
			
			for(f=0;f<this.linkName.length;f++){
				this.link[f] = new Link();
			}
			//link.resize(title,x-position, y-position,size)
			this.link[0].resize(this.linkName[0],150,height-10,150);
			this.link[1].resize(this.linkName[1],300,height-10,150);
			this.link[2].resize(this.linkName[2],450,height-10,150);
			this.link[3].resize(this.linkName[3],width-200,height-10,200);
		}else if(mobile==true){	
			this.h = 100;
			this.y = height-this.h;
			this.w = width;
			this.spacing = width*0.25;
			this.fill = 240;
			for(f=0;f<this.linkName.length;f++){
				this.link[f] = new Link();
			}
			//link.resize(title,x-position, y-position,size)
			this.link[0].resize(this.linkName[0],width*0.2,height*0.9,width*0.15);
			this.link[1].resize(this.linkName[1],width*0.4,height*0.9,width*0.15);
			this.link[2].resize(this.linkName[2],width*0.6,height*0.9,width*0.15);
			this.link[3].resize(this.linkName[3],width*0.8,height*0.9,width*0.15);
		}
	}

	function Link(){
		this.h;
		this.x;
		this.y;
		this.size;
		this.text;

		this.display = function(p,h){
			if(mobile==false){
				fill(240);
				text(this.text,this.x,this.y);
				if(page==p){
					push();
					noStroke();
					fill(240);
					beginShape();
						vertex(this.x-15,height); //bottom left
						vertex(this.x-20,height-h+10);
						vertex(this.x-30,height-h-3);//top left
						vertex(this.x+this.size-8,height-h-3);//top right
						vertex(this.x+this.size-20,height-h+10);
						vertex(this.x+this.size-26,height);//bottom right
					endShape();
					fill(15)
					ellipse(this.x+this.size-9,this.y-15,20);
					ellipse(this.x-31,this.y-15,20);
					fill(15);
					text(this.text,this.x,this.y);
					pop();
					}
			}else if(mobile==true){
				push();
				noStroke();
				if(page!=p){
					fill(200);
					}else{fill(50)}
				ellipse(this.x,this.y,this.size);
				pop();
			}
		}
		
		this.hover = function(p){
			if(mobile==false){
				if(this.x<mouseX && mouseX<this.x+this.size && height-40<mouseY && p!=page){
					push();
						fill(250,250,200);
						noStroke();
						text(this.text,this.x,this.y);
					pop();
				}
			}else{}
		}
		
		this.click = function(p){
			if(mobile==false){
				if(this.x<mouseX && mouseX<this.x+this.size && height-40<mouseY&& p!=page){
					slide.pageTrans(p);
				}
			}else if(mobile==true){
				if(mouseX>this.x-(this.size*0.5) && 
				   mouseX<this.x+(this.size*0.5) &&
				   mouseY>this.y-(this.size*0.5) &&
				   mouseY<this.y+(this.size*0.5) && 
				   p!=page){
				   slide.pageTrans(p);
				}
			}
		}
		
		this.resize = function(title,x,y,s){
			this.y = y;
			this.text = title;
			this.x = x;
			this.size = s;
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
		
		if(mobile==false){
		push();
			fill(30);
			textSize(this.textSize);
			textFont(notoItal);
			text(title[page][n],this.titlex, this.titley);
			textFont(notoReg);
			text(caption[page][n],this.titlex,this.titley+30);
			text(dimension[page][n],this.titlex,this.titley+60);
			text(yyyy[page][n],this.titlex,this.titley+90);
		pop();
		}else if(mobile==true){
			push();
			fill(30);
			textSize(this.textSize);
			textFont(notoItal);
			text(title[page][n],this.titlex-(title[page][n].length*(this.textSize*0.25)), this.titley);
			textFont(notoReg);
			text(caption[page][n],this.titlex-(caption[page][n].length*(this.textSize*0.25)),this.titley+30);
			text(dimension[page][n],this.titlex-(dimension[page][n].length*(this.textSize*0.25)),this.titley+60);
			text(yyyy[page][n],this.titlex-(yyyy[page][n].length*(this.textSize*0.25)),this.titley+90);
			pop();
		}
	}

	this.resize = function(){
		canvas.size(windowWidth,windowHeight);
		if(mobile==false){ // Landscape
			this.imgHeight = height*0.85;
			this.imgWidth = (this.imgHeight/img[page][n].height)*img[page][n].width;
			//this.trans = 255;
			this.imgx = width*0.35;
			this.imgy = height*0.45;
			this.titlex = width*0.65;
			this.titley = height*0.2;
			if(width<900){
			this.textSize = 15;
			}else{this.textSize = 15;}
		}else{	
			canvas.size(windowWidth,height);
			this.textSize = width*0.03;
			this.imgHeight = windowHeight*0.5;
			this.imgWidth = (this.imgHeight/img[page][n].height)*img[page][n].width;
			this.imgx = width*0.5;
			this.imgy = height*0.3;
			this.titlex = width*0.5;
			this.titley = height*0.65;
		}
	}
	
	this.transition = function(){
		if(mobile==false){
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

			if(mobile==true){
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
			}else if(mobile==false){
						if(this.trans==255){
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
		if(mobile==false){
			if(count>5){
				this.transSpeed = -20;
				page = k;
				n = 0;
				count = 0;
				//slide.resize();
				slide.display();
			}
		}else{
				print("page change");
				page = k;
				this.page = page;
				n = 0;
				this.n = n;
				slide.resize();
				slide.display();
				resize();
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
		if(mouseX>this.x && mouseX<this.x+this.w && mouseY>this.y && mouseY<this.y+this.h && mobile==false){
			this.buttFill = 70;
			this.line = 255;
		}else{
			this.buttFill = 200;
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
		if(mouseX>this.x && mouseX<this.x+this.w && mouseY>this.y && mouseY<this.y+this.h && mobile==false){
			this.buttFill = 70;
			this.line = 255;
		}else{
			this.buttFill = 200;
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
	if(width>height){
		mobile = false;
	}else{mobile = true;}
	
	
	if(mobile==false){
		slide.resize();
		slide.display();
		backButton = new backButt(width*0.64,height*0.45,width*0.05);
		nextButton = new nextButt(width*0.74,height*0.45,width*0.05);
		backButton.display();
		nextButton.display();
		navBar.resize();
		navBar.display();
	}
	if(mobile==true){
		slide.resize();
		slide.display();
		backButton = new backButt(width*0.1,height*0.65,width*0.15);
		nextButton = new nextButt(width*0.75,height*0.65,width*0.15);
		backButton.display();
		nextButton.display();
		navBar.resize();
		navBar.display();
	}
}