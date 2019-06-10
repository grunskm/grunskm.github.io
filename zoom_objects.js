
function NavBar(){
	this.h;
	this.y;
	this.w;
	this.spacing;
	this.fill;
	this.stroke;
	this.about;
	
	this.titlex;
	this.titley;
	
	this.backButton;
	this.nextButton;
	
	this.link = [];
	this.groupLink = [];
	
	this.linkName = [
		"Paint",
		"Plaster",
		"Installation",
		"Matthis Grunsky"
		];
		
	this.groupName = [
		["Gum Paintings","Ghosts","Elixirs"],// removed - ,"Early Work"
		["Printed Napkins","Paper Towel"],
		["Inside Out","GHOSTS","Falling Dots","Paintings"],
		[""]
	];
	
	this.display = function(){
	if(mobile==false){
		push();
		if(fullSite==true){
		for(e=0;e<this.link.length;e++){
			this.link[e].display(e,this.h);
			this.link[e].hover(e);
			}
		}else{
			fill(50);
			text("Matthis Grunsky",width*0.04,75);
			text("Paintings",width*0.04,130);
			text("Please Wait",width*0.04,280);
			text("Loading "+"image"+nPage+"_"+nGroup+"_"+nSlide+".jpg",width*0.04,300);
			text(imgNum + "/40 ",width*0.04,320);
				}
		if(this.groupName[page].length>1 && fullSite==true){
		for(t=0;t<this.groupName[page].length;t++){
			this.groupLink[t].display(t,this.h);
			this.groupLink[t].hover(t);
		}
		}else{}
			fill(50);
			textFont(notoItal);
			text(title[page][group][n],this.titlex, this.titley);
 			textFont(notoReg);
 			text(caption[page][group][n],this.titlex,this.titley+25);
 			text(dimension[page][group][n],this.titlex,this.titley+50);
 			text(yyyy[page][group][n],this.titlex,this.titley+75);
		pop();
		if(img[page][group].length>1){
		this.backButton.display();
    	this.nextButton.display();
    	}
    	}else if(mobile==true){
    		push();
    		this.backButton.display();
    		this.nextButton.display();
    		pop();
    	}
	}
	
	this.click = function(){
		if(mobile==false){
			if(img[page][group].length>1){
			this.nextButton.click();
			this.backButton.click();
			}
			
			for(e=0;e<this.link.length;e++){
				this.link[e].click(e);
			}
			for(o=0;o<this.groupName[page].length;o++){
				this.groupLink[o].click(o);
			}
		}else if(mobile==true){
			this.nextButton.click();
			this.backButton.click();
		}
	}
	
	this.resize = function(){

		if(mobile==false){
			this.h = 35;
			this.y = height-this.h;
			this.w = 300;
			this.spacing = 150;
			this.fill = 250;
			this.stroke = 150;
			this.titlex = 50;
			this.titley = height*0.75;
			
			this.backButton = new backButt(50,height*0.6,50);
			this.nextButton = new nextButt(50+100,height*0.6,50);
			
			for(f=0;f<this.linkName.length;f++){
				this.link[f] = new Link();
			}
			//link.resize(title,x-position, y-position,size)
			this.link[0].resize(this.linkName[0],50,height*0.2,300,txtSize*2);
			this.link[1].resize(this.linkName[1],50,height*0.25,300,txtSize*2);
			this.link[2].resize(this.linkName[2],50,height*0.3,300,txtSize*2);
			this.link[3].resize(this.linkName[3],50,80,300,txtSize*2);
			
			for(w=0;w<this.groupName.length;w++){
				this.groupLink[w] = new GroupLink();
			}
			
			this.groupLink[0].resize(this.groupName[0][group],this.w*0.15,height*0.5,30);
			this.groupLink[1].resize(this.groupName[1][group],this.w*0.30,height*0.5,30);
			this.groupLink[2].resize(this.groupName[2][group],this.w*0.45,height*0.5,30);
			this.groupLink[3].resize(this.groupName[3][group],this.w*0.60,height*0.5,30);
			
		}else if(mobile==true){	
		
			this.backButton = new backButt(width*0.11,height*0.8,width*0.25);
			this.nextButton = new nextButt(width*0.61,height*0.8,width*0.25);
		}
  	}
}

function GroupLink(){
		this.h;
		this.x;
		this.y;
		this.size;
		this.text;

		this.display = function(g,h){
				push();
				fill(200);
				ellipseMode(CENTER)
				noStroke();
				ellipse(this.x+(this.size/2),this.y+(this.size/2),this.size/4);
				if(group==g){
					fill(200);
					ellipse(this.x+(this.size/2),this.y+(this.size/2),this.size);
					push();
					translate(this.x+this.size,this.y);
					rotate(5.3);
					fill(0);
					textSize(15);
			 		text(navBar.groupName[page][g],0,0);
			 		pop();
				}
				pop();
		}
		
		this.hover = function(g){
			if(mobile==false){
				if(mouseX>this.x && 
				   mouseX<this.x+this.size && 
				   mouseY>this.y && 
				   mouseY<this.y+this.size &&
				   group!= g
				   ){
					push();
					push();
					stroke(225,0,0);
					noFill();
					ellipseMode(CORNER);
					ellipse(this.x,this.y,this.size);
					pop();
					translate(this.x+this.size,this.y);
					rotate(5.3);
					fill(0);
					textSize(15);
			 		text(navBar.groupName[page][g],0,0);
					pop();
				}
			}else{}
		}
		
		this.click = function(g){
				if(mouseX>this.x && mouseX<this.x+this.size && mouseY>this.y && mouseY<this.y+this.size && g!=group){
					slide.groupTrans(g);
					print("click");
				}
		}
		
		this.resize = function(title,x,y,s){
			this.y = y;
			this.text = title;
			this.x = x;
			this.size = s;
		}
	}

function Link(){
		this.w;
		this.h;
		this.x;
		this.y;
		this.text;

		this.display = function(p,h){
			if(mobile==false){
				fill(100);
				text(this.text,this.x,this.y);
				if(page==p){
					push();
					fill(15);
					text(this.text,this.x,this.y);
					pop();
					}
			}else if(mobile==true){
			}
		}

		
		this.hover = function(p){
			if(mobile==false){
				if(mouseX > this.x-50 && 
				   mouseX < this.x+this.w && 
				   mouseY > this.y-this.h+10 &&
				   mouseY < this.y && 
				   p!=page){
					push();
					    //fill(0,250,0);
			        	//rect(this.x-50,this.y-this.h+10,this.w,this.h);
						fill(250,0,0);
						noStroke();
						text(this.text,this.x,this.y);
					pop();
				}
			}else{
			}
		}
		
		this.click = function(p){
			if(mobile==false){
				if(mouseX > this.x-50 && 
				   mouseX < this.x+this.w && 
				   mouseY > this.y-this.h+10 &&
				   mouseY < this.y && 
				   p!=page){
					slide.pageTrans(p);
				}
			}else if(mobile==true){
			}
		}
		
		this.resize = function(title,x,y,w,h){
			this.y = y;
			this.text = title;
			this.x = x;
			this.h = h;
			this.w = w;
		}
}

function Slide(){
	this.x;
	this.imgx;
	this.imgy;
	this.imgHeight;
	this.imgWidth=0;
	
	this.textSize;
	this.titlex;
	this.titley;
	
	this.move = 0;
	this.hold = 0;
	this.fill = 0;
	
	this.trans = 255;
	this.transSpeed = 0;
	this.n = n;
	this.page = page;
	this.group = group;

	this.display = function(){	
		if(mobile==false){
		push();
			background(this.fill);
			image(img[this.page][this.group][this.n],this.imgx,this.imgy,this.imgWidth,this.imgHeight);
			background(240,255-this.trans);
			this.hover();
		pop();
		}else if(mobile==true){
		push();
			background(this.fill);
			textSize(width*0.04);
			text("MATTHIS GRUNSKY", width*0.14,height*0.05);
			image(mobileImg[n],this.imgx,this.imgy,this.imgWidth,this.imgHeight);
		pop();
		}
	}

	this.resize = function(){
		
		if(mobile==false){ // Landscape
			this.imgHeight = height*0.8;
			this.imgWidth = (this.imgHeight/img[page][group][n].height)*img[page][group][n].width;
			if(this.imgWidth>width-450){
				this.imgWidth = width-450;
				this.imgHeight = (this.imgWidth/img[page][group][n].width)*img[page][group][n].height;
			}
			
			this.imgx = navBar.w+(this.imgWidth/2)+100;
			this.imgy = height/2;
			this.fill = 250;
			
		}else if(mobile==true){	//portrait
			this.imgWidth = width;
 			this.imgHeight = (this.imgWidth/mobileImg[n].width)*mobileImg[n].height;
			this.imgx = 0;
			this.imgy = height*0.10;
			this.fill = 240;
		}
	}
	
	this.hover = function(){
	 if(mouseX > this.imgx-(this.imgWidth/2) &&
	 	mouseX < this.imgx+(this.imgWidth/2) &&
	 	mouseY > this.imgy-(this.imgHeight/2) &&
	 	mouseY < this.imgy+(this.imgHeight/2)){
	 	background(this.fill);
	 	let scaleX = map(mouseX,this.imgx-(this.imgWidth/2),this.imgx+(this.imgWidth/2),this.imgx-(img[this.page][this.group][this.n].width/2),this.imgx+(img[this.page][this.group][this.n].width/2));
	 	let scaleY = map(mouseY,this.imgy-(this.imgHeight/2),this.imgy+(this.imgHeight/2),this.imgy-(img[this.page][this.group][this.n].height/2),this.imgy+(img[this.page][this.group][this.n].height/2));
	 	push();
	 	//imageMode(CORNER);
	 	image(img[this.page][this.group][this.n],width-scaleX,height-scaleY);
	 	pop();
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
				this.group = group;
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
					n++;
					if(n>=mobileImg.length){
						n=0;
					}
					print(n);
					slide.display();
					count = 0;
				}
			}else if(mobile==false){
						if(count>20){
							this.transSpeed = -20;
							n++;
							count = 0;
							if(n>=img[page][group].length){
								n=0
							}
							slide.display();
					   }
					}
	}

	this.back = function(){

			if(mobile==true){
				if(count>5){
					n--;
					if(n<0){
						n=mobileImg.length-1;
							}
					slide.display();
					count = 0;
					print(count);
				}
			}else if(mobile==false){
						if(count>20){
							this.transSpeed = -30;
							n--;
							count = 0;
							if(n<0){
								n=img[page][group].length-1;
							}
							slide.display();
					   }
					}
	}
	
	this.pageTrans = function(k){
		if(mobile==false){
			if(count>5){
				this.transSpeed = -20;
				page = k;
				group = 0;
				n = 0;
				count = 0;
			}
		}else{
				print("page change");
				page = k;
				this.page = page;
				group = 0;
				this.group = 0;
				n = 0;
				this.n = n;
		}
	}
	
	this.groupTrans = function(k){
		if(mobile==false){
			if(count>5){
				this.transSpeed = -20;
				group = k;
				n = 0;
				count = 0;
			}
		}else{
				print("page change");
				group = k;
				this.group = group;
				n = 0;
				this.n = n;
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
			this.buttFill = 240;
			this.line = 250;
		}else{
			this.buttFill = 250;
			this.line = 50;
			}
		//noStroke();
		//fill(this.buttFill);
		//ellipse(this.x,this.y,this.w);
		stroke(this.line,50,50);
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
			this.buttFill = 240;
			this.line = 250;
		}else{
			this.buttFill = 250;
			this.line = 50;
			}
		noStroke();
		//fill(this.buttFill);
		//ellipse(this.x,this.y,this.w);
		stroke(this.line,50,50);
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

	if(windowWidth>windowHeight){
		mobile = false;
	}else{mobile = true;}
	
	
	if(mobile==false){
		canvas.size(windowWidth,windowHeight);
		navBar.resize();
		slide.resize();
		slide.display();
		navBar.display();
	}
	if(mobile==true){
		imageMode(CORNER);

		canvas.size(windowWidth,windowHeight);
		slide.resize();
		slide.display();
		navBar.resize();
		navBar.display();
	}
}